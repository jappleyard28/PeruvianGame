const express = require('express');
const fs = require('fs');
const { body, query, validationResult, oneOf } = require('express-validator');
const history = require('connect-history-api-fallback');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PERUVIAN_PORT || 3000;
const PATH_TO_VUE = '../peruvian-game-vue';

const NUMBER_OF_QUESTIONS = 10;
const SESSION_TOKEN_LIFESPAN = 1000 * 60 * 60 * 6;
const DIFFICULTY_TYPES = Object.freeze({ EASY: 1, MEDIUM: 2, HARD: 3 });
const QUIZ_TYPES = Object.freeze({ MATH: 'math', NUTRITION: 'nutrition' });

const SESSION_QUESTIONS = {
	// format
	/*
	"session_uuid": {
		expires: "timestap",
		difficulty: 1
		answers: [
			55,
			67
		]
	}
	*/
};

const getDb = (filePath, encoding = 'utf8') =>
	new Promise((resolve, reject) => {
		fs.readFile(filePath, encoding, (err, content) => {
			if (err) {
				return reject(err);
			}
			resolve(content);
		});
	}).then(JSON.parse);

const updateDb = (filePath, content) => fs.writeFileSync(filePath, JSON.stringify(content, null, 4));

const dumpExpiredQuestions = () => {
	console.log(Date.now().toString() + ': Starting dump of expired sessions.');
	let count = 0;
	for (const questionSet in SESSION_QUESTIONS) {
		if (SESSION_QUESTIONS[questionSet].expires <= Date.now()) {
			delete SESSION_QUESTIONS[questionSet];
			count++;
		}
	}
	console.log(`${Date.now().toString()}: Dump finshed. Sessions removed: ${count}`);
};

// Middleware to serve the vue site
const staticFileMiddleware = express.static(`${PATH_TO_VUE}/dist`);

// call for unredirected requests
app.use(staticFileMiddleware);

app.use(express.json());

const getObjValues = (obj) => Object.keys(obj).map((key) => obj[key]);

// Any API calls

// return list of leaderboard at liimit specified
app.get(
	'/api/leaderboard',
	[ query('limit', 'limit must be an integer').isInt(), query('page', 'page must be an integer').isInt() ],
	async (req, res) => {
		//validation
		const validResult = validationResult(req);
		if (!validResult.isEmpty()) return res.json(validResult.mapped());

		const db = await getDb('leaderboard.json');
		const sortedLeaderboard = db.sort((a, b) => a.score - b.score);
		const limit = req.query.limit || 15;
		const page = (req.query.page > 0 ? req.query.limit : 1) || 1;

		const leaderboardArray = sortedLeaderboard.slice(limit * (page - 1), limit);
		return res.json({ leaderboard: leaderboardArray, page: page });
	}
);

const getRandInt = (max) => Math.floor(Math.random() * max);

const createAdditionSet = (a = null, b = null) => {
	a = a || getRandInt(10);
	b = b || getRandInt(10);
	return {
		num1: a,
		num2: b,
		operator: '+',
		answer: a + b
	};
};

const createSubtractionSet = (a = null, b = null) => {
	a = a || getRandInt(10);
	b = b || getRandInt(10);
	return {
		num1: a,
		num2: b,
		operator: '−',
		answer: a - b
	};
};
const createMultiplicationSet = (a = null, b = null) => {
	a = a || getRandInt(10);
	b = b || getRandInt(10);
	return {
		num1: a,
		num2: b,
		operator: '×',
		answer: a * b
	};
};

const generateMathQuiz = (difficulty) => {
	const SESSION_TOKEN = uuidv4();
	const questions = [];
	const answers = [];

	const qGenTypes = [ createAdditionSet, createSubtractionSet, createMultiplicationSet ];

	// fill question and answer arrays
	for (let i = 0; i < NUMBER_OF_QUESTIONS; i++) {
		const questionParts = [];
		let prevPartAns;
		// create each question part (number depends on how difficult)
		for (let difficultyLevel = 1; difficultyLevel <= difficulty; difficultyLevel++) {
			// choose random question type and generate set
			let part;
			// use 2 new values if
			if (questionParts.length == 0) {
				part = qGenTypes[getRandInt(qGenTypes.length)]();
				console.log(''); //REMOVEME
			} else {
				part = qGenTypes[getRandInt(qGenTypes.length)](prevPartAns);
			}
			questionParts.push(part);
			prevPartAns = part.answer;
			console.log(part); //REMOVEME
		}
		answers.push(questionParts[questionParts.length - 1].answer);

		let question = '';
		// combine questino parts to form question
		questionParts.forEach((part) => {
			if (question.length === 0) {
				question = `${part.num1} ${part.operator} ${part.num2}`;
			} else {
				question = `( ${question} ) ${part.operator} ${part.num2}`;
			}
		});
		questions.push(question);
	}

	console.log(answers); //REMOVEME

	// create and store server side information for generated question
	const session = {
		expires: Date.now() + SESSION_TOKEN_LIFESPAN,
		difficulty: difficulty,
		answers: answers
	};
	SESSION_QUESTIONS[SESSION_TOKEN] = session;
	return [ SESSION_TOKEN, questions ];
};

const generateNutritionQuiz = async (difficulty) => {
	const dbQuestions = (await getDb('questions.json'))[QUIZ_TYPES.NUTRITION];
	const questions = [];
	const checkedIndexes = [];
	let is = [];
	while (questions.length < NUMBER_OF_QUESTIONS) {
		const index = getRandInt(dbQuestions.length);

		// grab a different question if already have the question
		if (checkedIndexes.includes(index) || dbQuestions[index].difficulty != difficulty) continue;

		const dbQuestion = dbQuestions[index];
		checkedIndexes.push(index);

		// grab a different question if difficulty not what is needed
		if (dbQuestions[index].difficulty != difficulty) continue;

		const question = {};
		question.id = dbQuestion.id;
		question.question = dbQuestion.question;
		question.type = dbQuestion.type;
		question.difficulty = difficulty;

		//add type specific values
		if (dbQuestion.type === 'multiple-choice') question.options = dbQuestion.options;

		questions.push(question);
	}
	return questions;
};

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
				const [ SESSION_TOKEN, questions ] = generateMathQuiz(difficulty);
				quiz.questions = questions;
				quiz.session_token = SESSION_TOKEN;
				break;
			case QUIZ_TYPES.NUTRITION:
				quiz.questions = await generateNutritionQuiz(difficulty);
				break;
		}
		// return res
		return res.json(quiz);
	}
);

// to make results from user answers for genereated amths questions
const checkMathQuiz = (SESSION_TOKEN, userAnswers) => {
	const session = SESSION_QUESTIONS[SESSION_TOKEN];
	const answers = session.answers;

	// check answers
	const results = { score: 0, results: [], answers: answers };
	for (let i = 0; i < answers.length; i++) {
		if (answers[i] === userAnswers[i]) {
			results.score += session.difficulty; // CHANGE TO WHATEVER SCORING SYSTEM IS WANTED
			results.results.push(true);
		} else {
			results.results.push(false);
		}
	}

	// remove session question
	delete SESSION_QUESTIONS[SESSION_TOKEN];

	// respond with score and results
	return results;
};

const checkNutritionQuiz = async (userAnswers) => {
	const results = { score: 0, results: [], answers: [] };
	const dbAnswers = await getDb('questions.json')[QUIZ_TYPES.NUTRITION];

	userAnswers.forEach((userAnswer) => {
		// validate if question id valid
		const question = dbAnswers.find((dbQ) => dbQ.id === userAnswer.question) || null;
		if (question !== null && question.answer === userAnswer) {
			results.score += question.difficulty;
			results.answers.push(question.answer);
			results.results.push(true);
		} else {
			answers.push('INVALID QUESTION');
			results.results.push(false);
		}
	});

	return results;
};

app.post(
	'/api/answer',
	[
		body('name').escape().trim(),
		oneOf(
			[
				[
					body('type').equals(QUIZ_TYPES.NUTRITION),
					body('answers.*.question', 'question must be set to a valid UUID')
						.isUUID()
						.custom((value, { req }) => {}),
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
		const validResult = validationResult(req);
		const hasErrors = !validResult.isEmpty();
		if (hasErrors)
			return res.status(400).json(validResult.mapped());

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
				results = checkMathQuiz(SESSION_TOKEN, answers);
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
				results = await checkNutritionQuiz(answers);
				break;

			default:
				return res.status(400).json({ message: 'invalid quiz type' });
		}

		// store score
		const leaderboard = await getDb('leaderboard.json');
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
	for (i = 0; i < amount; i++) ids.push(uuidv4());
	return res.json(ids);
});

// Allow for use of history api
app.use(
	history({
		index: `${PATH_TO_VUE}/dist/index.html`
	})
);

// call for redirected requests
app.use(staticFileMiddleware);

// Make server listen on port specified by environment variable or default port 3000
app.listen(PORT, () => {
	console.log(`Server started on port http://localhost:${PORT}`);
	// repeat calls every 2hrs
	setInterval(() => {
		dumpExpiredQuestions();
	}, 1000 * 60 * 60 * 2); // every 2hrs
});
