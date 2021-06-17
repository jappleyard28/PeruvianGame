const BASE = 'http://localhost:3000';

const getData = (endpoint, params) => {
	const url = new URL(endpoint, BASE);
	const headers = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	url.search = new URLSearchParams(params).toString();
	return fetch(url, headers).then((data) => data.json());
};

const postData = (endpoint, body) => {
	const url = new URL(endpoint, BASE);
	const headers = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	};
	return fetch(url, headers).then((data) => data.json());
};

exports.getQuiz = (params) => getData('/api/quiz', params);

exports.sendAnswers = (ans) => postData('/api/answer', ans);

exports.getLeaderboard = (limit = 15, page = 0) => getData('/api/leaderboard', {limit: limit, page: page});
