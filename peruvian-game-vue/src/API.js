const BASE = 'http://localhost:3000'

// const postData = (url = '', data = {}) => {
//     fetch(url, {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         redirect: 'follow',
//         referrerPolicy: 'no-referer',
//         body: JSON.stringify(data)
//     });
// };

const getData = (url = '') => 
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
    });


exports.getQuiz = (params) => {
    let url = new URL('/api/quiz', BASE);
    url.search = new URLSearchParams(params).toString();
    return getData(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response);
            }
        })
        //.then((data) => JSON.parse(data));
};