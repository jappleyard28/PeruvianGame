const { v4: uuidv4 } = require('uuid');

const { getRandInt } = require('./Common');
const { getDb } = require('./DbHelpers');

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

exports.generateMathQuiz = (difficulty, NUMBER_OF_QUESTIONS, SESSION_QUESTIONS, SESSION_TOKEN_LIFESPAN) => {
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
			// use 2 new values if no prev value for part
			if (questionParts.length == 0) {
				part = qGenTypes[getRandInt(qGenTypes.length)]();
			} else {
				part = qGenTypes[getRandInt(qGenTypes.length)](prevPartAns);
			}
			questionParts.push(part);
			prevPartAns = part.answer;
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

	// create and store server side information for generated question
	const session = {
		expires: Date.now() + SESSION_TOKEN_LIFESPAN,
		difficulty: difficulty,
		answers: answers
	};
	SESSION_QUESTIONS[SESSION_TOKEN] = session;
	return [ SESSION_TOKEN, questions ];
};

exports.generateNutritionQuiz = async (difficulty, NUMBER_OF_QUESTIONS, QUIZ_TYPES, QUESTION_DB_PATH) => {
	const dbQuestions = (await getDb(QUESTION_DB_PATH))[QUIZ_TYPES.NUTRITION];
	const questions = [];
	const checkedIndexes = [];
	while (questions.length < NUMBER_OF_QUESTIONS) {
		const index = getRandInt(dbQuestions.length);

		// grab a different question if already have the question
		if (checkedIndexes.includes(index)) continue;

		const dbQuestion = dbQuestions[index];

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

// to make results from user answers for genereated amths questions
exports.checkMathQuiz = (SESSION_QUESTIONS, SESSION_TOKEN, userAnswers) => {
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

exports.checkNutritionQuiz = async (userAnswers, QUIZ_TYPES, QUESTION_DB_PATH) => {
	const results = { score: 0, results: [], answers: [] };
	const dbAnswers = (await getDb(QUESTION_DB_PATH))[QUIZ_TYPES.NUTRITION];

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
