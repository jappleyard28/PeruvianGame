const fs = require('fs');

exports.getDb = (filePath, encoding = 'utf8') =>
	new Promise((resolve, reject) => {
		fs.readFile(filePath, encoding, (err, content) => {
			if (err) {
				return reject(err);
			}
			resolve(content);
		});
	}).then(JSON.parse);

exports.updateDb = (filePath, content) => fs.writeFileSync(filePath, JSON.stringify(content, null, 4));

exports.dumpExpiredQuestions = (SESSION_QUESTIONS) => {
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
