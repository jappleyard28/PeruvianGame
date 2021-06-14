const express = require('express');
const fs = require('fs');
const history = require('connect-history-api-fallback');

const app = express();
const PORT = process.env.PERUVIAN_PORT;
const PATH_TO_VUE = '../peruvian-game-vue';

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

const updateDb = (content) => fs.writeFileSync(filePath, JSON.stringify(content));

const dumpExpiredQuestions = () => {
  console.log(Date.now().toString()+": Starting dump of expired sessions.");
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

// Any API calls

// return list of leaderboard at liimit specified
app.get('/api/leaderboard', async (req, res) => {
	const db = await getDb('leaderboard.json');
	const sortedLeaderboard = db.leaderboard.sort((a, b) => a.score - b.score);
	const limit = req.query.limit || 15;
	const page = (req.query.page > 0 ? req.query.limit : 1) || 1;

	const leaderboardArray = sortedLeaderboard.slice(limit * (page - 1), limit);
	return res.json({ leaderboard: leaderboardArray, page: page });
});

	// return quiz data
app.get('/api/quiz', async (req, res) => {
  //validate type
	const quizType = req.query.type;
	if (typeof quizType == 'undefined' || !(quizType in [ 'math', 'nutrition' ])) {
		return res.status(400).json({ message: 'invlaid type for quiz' });
	}

  // get questionset for that type
  // if maths do sessions stuff
  // return res 
	return res.json({message: 'nothing yet...'});
});

app.post('/api/answer', (req, res) => {
	// take quiz answers
});

// endpoint for recieving user answers to generated maths questions
app.post('/api/mathscore', async (req, res) => {
	const SESSION_TOKEN = req.body.session_token;
	const userAnswers = req.body.answers;
	const name = req.body.name || 'Anonymous';

	// validate submission
	if (typeof SESSION_TOKEN == 'undefined' || !(SESSION_TOKEN in SESSION_QUESTIONS)) {
		return res.status(410).json({ message: 'invalid session token' });
	}

	const session = SESSION_QUESTIONS.SESSION_TOKEN;
	const answers = sesssion.answers;
	if (userAnswers.length != answers.length || !userAnswers.every((ans) => typeof ans == 'number')) {
		return res.status(400).json({ message: 'answers length needs to match number of questions and must all be numbers' });
	}

	// check answers
	const results = { score: 0, results: [] };
	for (let i = 0; i < answers.length; i++) {
		if (answers[i] == userAnswers[i]) {
			results.score += session.difficulty; // CHANGE TO WHATEVER SCORING SYSTEM IS WANTED
			results.results.push(true);
		} else {
			results.results.push(false);
		}
	}
	// find score

	// store score
	const db = await getDb('leaderboard.json');
	const leaderboardEntry = { name: name, score: results.score, timestamp: Date.now() };
	db.leaderboard.push(leaderboardEntry);
	updateDb(db);

	// remove session question
	delete SESSION_QUESTIONS.SESSION_TOKEN;

	// respond with score and results
	results.answers = userAnswers;
	return res.json(results);
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
app.listen(PORT || 3000, () => {
	console.log('Server started');
	// repeat calls every 2hrs
	setInterval(() => {
		dumpExpiredQuestions();
	}, 1000 * 60 * 60 * 2); // every 2hrs
});
