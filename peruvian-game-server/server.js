const express = require('express');
const { body, query, validationResult, oneOf } = require('express-validator');
const history = require('connect-history-api-fallback');
const { v4: uuidv4 } = require('uuid');

const { getObjValues } = require('./helpers/Common');
const { getDb, updateDb, dumpExpiredQuestions } = require('./helpers/DbHelpers');
const {
	generateMathQuiz,
	generateNutritionQuiz,
	checkMathQuiz,
	checkNutritionQuiz
} = require('./helpers/QuestionHelpers');

const app = express();
const PORT = process.env.PERUVIAN_PORT || 3000;
const PATH_TO_VUE = '../peruvian-game-vue';

const QUESTION_DB_PATH = './db/questions.json';
const LEADERBOARD_DB_PATH = './db/leaderboard.json';

const NUMBER_OF_QUESTIONS = 10;
const SESSION_TOKEN_LIFESPAN = 1000 * 60 * 60 * 6;
const DIFFICULTY_TYPES = Object.freeze({ EASY: 1, MEDIUM: 2, HARD: 3 });
const QUIZ_TYPES = Object.freeze({ MATH: 'math', NUTRITION: 'nutrition' });

const SESSION_QUESTIONS = {};

// Middleware to serve the vue site
const staticFileMiddleware = express.static(`${PATH_TO_VUE}/dist`);

// call for unredirected requests
app.use(staticFileMiddleware);

app.use(express.json());

// Any API calls

// return list of leaderboard at liimit specified
app.get(
	'/api/leaderboard',
	[ query('limit', 'limit must be an integer').isInt(), query('page', 'page must be an integer').isInt() ],
	async (req, res) => {
		//validation
		const validResult = validationResult(req);
		if (!validResult.isEmpty()) return res.json(validResult.mapped());

		const db = await getDb(LEADERBOARD_DB_PATH);
		const sortedLeaderboard = db.sort((a, b) => a.score - b.score);
		const limit = req.query.limit || 15;
		const page = (req.query.page > 0 ? req.query.limit : 1) || 1;

		const leaderboardArray = sortedLeaderboard.slice(limit * (page - 1), limit);
		return res.json({ leaderboard: leaderboardArray, page: page });
	}
);

// return quiz data
app.get(
	'/api/quiz',
	[
		query('type', 'must have a quiz type').not().isEmpty(),
		query('type', `type must be of ${getObjValues(QUIZ_TYPES)}`).custom((value) =>
			getObjValues(QUIZ_TYPES).includes(value)
		),
		query('difficulty', 'must have a difficulty for the quiz').not().isEmpty(),
		query('difficulty', 'difficulty must be an integer').isInt()
	],
	async (req, res) => {
		//validate type
		const validResult = validationResult(req);
		if (!validResult.isEmpty()) return res.status(400).json(validResult.mapped());

		const quizType = req.query.type;
		const difficulty = parseInt(req.query.difficulty) || null;

		// validate quiz type provided and existsin db
		if (typeof quizType === 'undefined') return res.status(400).json({ message: 'missing quiz type' });
		if (!getObjValues(QUIZ_TYPES).includes(quizType))
			return res.status(400).json({ message: 'invlaid type for quiz' });

		// validate quiz difficulty level provided and exists on server
		if (typeof difficulty === 'undefined') return res.status(400).json({ message: 'missing quiz difficulty' });
		// check and convert difficulty to int
		if (difficulty == null || !getObjValues(DIFFICULTY_TYPES).includes(difficulty))
			return res.status(400).json({ message: 'invalid difficulty for quiz' });

		// get questionset for that type
		const quiz = {};
		switch (quizType) {
			case QUIZ_TYPES.MATH:
				const [ SESSION_TOKEN, questions ] = generateMathQuiz(
					difficulty,
					NUMBER_OF_QUESTIONS,
					SESSION_QUESTIONS,
					SESSION_TOKEN_LIFESPAN
				);
				quiz.questions = questions;
				quiz.session_token = SESSION_TOKEN;
				break;
			case QUIZ_TYPES.NUTRITION:
				quiz.questions = await generateNutritionQuiz(
					difficulty,
					NUMBER_OF_QUESTIONS,
					QUIZ_TYPES,
					QUESTION_DB_PATH
				);
				break;
		}
		// return res
		return res.json(quiz);
	}
);

app.post(
	'/api/answer',
	[
		body('name').escape().trim(),
		oneOf(
			[
				[
					body('type').equals(QUIZ_TYPES.NUTRITION),
					body('answers.*.question', 'question must be set to a valid UUID')
						.isUUID(),
					body('answers.*.value', `value must be a string for ${QUIZ_TYPES.NUTRITION} types`).isString()
				],
				[
					body('type').equals(QUIZ_TYPES.MATH),
					body(
						'answers.*',
						`answers must be in the form of integers for the ${QUIZ_TYPES.MATH} type quiz`
					).isInt(),
					body('session_token', 'session token must be a valid UUID').isUUID()
				]
			],
			'Please match the parameters to the quiz type'
		)
	],
	async (req, res) => {
		// validate parameters
		const validResult = validationResult(req);
		const hasErrors = !validResult.isEmpty();
		if (hasErrors) return res.status(400).json(validResult.mapped());

		const name = req.body.name || 'Anonymous';
		const answers = req.body.answers;
		const type = req.body.type;

		// validate quiz type
		if (!getObjValues(QUIZ_TYPES).includes(type)) return res.status(400).json({ message: 'quiz type not valid' });

		let results;
		switch (type) {
			case QUIZ_TYPES.MATH:
				// validate session token
				const SESSION_TOKEN = req.body.session_token;
				if (typeof SESSION_TOKEN === 'undefined' || !(SESSION_TOKEN in SESSION_QUESTIONS))
					return res.status(410).json({ message: 'invalid session token' });

				// get results
				results = checkMathQuiz(SESSION_QUESTIONS, SESSION_TOKEN, answers, QUESTION_DB_PATH);
				break;

			case QUIZ_TYPES.NUTRITION:
				// validate type of answer list to correct answer list
				if (!answers.every((ans) => typeof ans.question === 'string' && typeof ans.value === 'string'))
					return res.status(400).json({ message: 'answers do not match the expected type' });

				// validate length and type of answer list to correct answer list
				if (!answers.every((ans) => typeof ans === 'number'))
					return res
						.status(400)
						.json({ message: 'answers length needs to match number of questions and must all be numbers' });

				//get results
				results = await checkNutritionQuiz(answers, QUIZ_TYPES, QUESTION_DB_PATH);
				break;

			default:
				return res.status(400).json({ message: 'invalid quiz type' });
		}

		// store score
		const leaderboard = await getDb(LEADERBOARD_DB_PATH);
		const leaderboardEntry = { name: name, score: results.score, timestamp: Date.now() };
		leaderboard.push(leaderboardEntry);
		updateDb('leaderboard.json', leaderboard);

		return res.json(results);
	}
);

// REMOVEME
app.get('/api/uuid', [ query('amount').not().isEmpty().isInt() ], (req, res) => {
	const result = validationResult(req);
	if (!result.isEmpty()) return res.status(400).json({ message: 'bad amount', report: validationResult.mapped() });
	const amount = parseInt(req.query.amount);

	const ids = [];
	for (let i = 0; i < amount; i++) ids.push(uuidv4());
	return res.json(ids);
});

// Allow for use of history api
app.use(history());

// call for redirected requests
app.use(staticFileMiddleware);

// Make server listen on port specified by environment variable or default port 3000
app.listen(PORT, () => {
	console.log(`Server started on port http://localhost:${PORT}`);
	// repeat calls every 2hrs
	setInterval(() => {
		dumpExpiredQuestions(SESSION_QUESTIONS);
	}, 1000 * 60 * 60 * 2); // every 2hrs
});
