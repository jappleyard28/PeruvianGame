# Backend

## To use

Each time you pull new commits run `yarn install` in this folder.

To start the server run

```sh
yarn start
```

## Filling out the Questions

To fill out the questions you can look at the ones that are already in the `questions.json` file to see the structure.
To fill the id field you can make a get request on `/api/uuid` with `amount` as a parameter to specify how many ids you want it to print.

## API

### GET `/api/leaderboard`

#### Parameters

* queries
  * `limit`: (DEFAULT: 15) to specify the limit on the number of results returned
  * `page`: (DEFAULT: 1) to specify an offset if a lmiit is used

#### Sample Response

```json
{
  "leaderboard": [
    {"name": "john smith", "score": 1000},
    {"name": "peter johnson", "score": 800}
  ],
  "page": 1
}
```

### GET `/api/quiz`

#### Parameters

* queries
  * `type`: to specify the quiz type either nutrition or math
  * `difficulty`: to specify the difficulty of the quiz

#### Sample Response

##### type=math

GET `/api/quiz?type=math&difficulty=1`

```json
{
    "questions": [
        "4 × 4",
        "9 × 3",
        "1 + 5",
        "6 × 5",
        "2 × 1",
        "7 − 5",
        "1 × 8",
        "2 − 9",
        "8 + 8",
        "6 + 8"
    ],
    "session_token": "36387b49-6437-455e-9237-4fb41c358712"
}
```

GET `/api/quiz?type=math&difficulty=2`

```json
{
    "questions": [
        "( 2 + 0 ) − 7",
        "( 9 × 7 ) − 6",
        "( 1 × 5 ) − 9",
        "( 5 − 3 ) + 1",
        "( 5 + 5 ) − 1",
        "( 2 + 7 ) − 3",
        "( 3 − 2 ) − 8",
        "( 4 + 9 ) − 3",
        "( 3 − 1 ) − 1",
        "( 5 × 8 ) − 4"
    ],
    "session_token": "0d94be1f-e7a8-44ec-a50c-ac9e96b92a46"
}
```

GET `/api/quiz?type=math&difficulty=3`

```json
{
    "questions": [
        "( ( 2 + 6 ) × 7 ) × 5",
        "( ( 5 × 4 ) − 6 ) × 0",
        "( ( 2 + 0 ) − 8 ) − 6",
        "( ( 4 + 6 ) × 4 ) × 1",
        "( ( 1 + 7 ) − 0 ) − 3",
        "( ( 2 − 2 ) − 9 ) + 0",
        "( ( 7 − 9 ) × 9 ) + 8",
        "( ( 9 − 8 ) − 3 ) + 6",
        "( ( 5 − 9 ) − 2 ) × 4",
        "( ( 6 × 6 ) × 4 ) + 3"
    ],
    "session_token": "a29f5137-cdd5-4494-a92d-ba5f3c9731aa"
}
```

##### type=nutrition

GET `/api/quiz?type=nutrition&difficulty=1`

```json
{
    "questions": [
        {
            "id": "6ee2b7e0-f283-42b8-a94f-96e79c5aab0b",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "149fb705-34a7-454d-8f73-573a04a0387d",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "5c63f5cf-247a-4b8d-b0a4-e7235b376568",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "fdd06a20-3fc2-49e4-b21b-aa5b36066414",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "5393b83f-1d78-4e42-961c-b419872d2814",
            "question": "What is an apple?",
            "type": "multiple-choice",
            "difficulty": 1,
            "options": [
                "A fruit",
                "an orange"
            ]
        },
        {
            "id": "6a25ca2a-3d63-471d-89ba-49e0556ea95c",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "10862e1d-442c-418a-903d-d8435cb2f6ac",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "ff3b6a02-e3f9-4d33-b6cf-62a788b3d84c",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "6106636b-bf54-4d3c-8678-0181f032eff1",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        },
        {
            "id": "454d5245-f621-42b6-803a-954938d7859e",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1
        }
    ]
}
```

### POST `/api/answer`

##### Parameters

#### Maths

* body
  * `answers`: array of the user's answers. Array of numbers for maths
  * `type`: the quiz type
  * `session_token`: the session token which is recieved from the question
  * `name`: (DEFAULT: `'Anonymous'`) the user's name so it can be put on leaderboard

##### Sample Request

REF 1

```json
{
  "answers": [10, 1, 4, 6, 8, 9, 8, 22, 10, 11],
  "type": "math",
  "session_token": "3b9eae62-e4a7-43c1-83c5-ac75a341e0ca",
  "name": "Tesst name"
}
```

##### Sample Response

From request in REF 1

```json
{
    "results": {
        "score": 1,
        "results": [
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        "answers": [
            10,
            4,
            7,
            16,
            12,
            -1,
            0,
            -6,
            1,
            -5
        ]
    }
}
```

##### Nutrition

* body
  * `answers`: array of the user's answers. Array objects that have two string values, `question` and `value` if sending answers for the nutrition quiz.
  * `type`: the quiz type
  * `name`: (DEFAULT: `'Anonymous'`) the user's name so it can be put on leaderboard

##### Sample Request

REF 2

```json
{
  "name": "",
  "type": "nutrition",
  "answers": [
    { "question": "5393b83f-1d78-4e42-961c-b419872d2814", "value": "A fruit" },
    { "question": "10862e1d-442c-418a-903d-d8435cb2f6ac", "value": "Potatoes" }
  ]
}

```

##### Sample Response

From request in REF 2

```json
{
    "results": {
        "score": 1,
        "results": [
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        "answers": [
            "A fruit",
            "Walrus",
            "Bird",
            "Meat",
            "Beans",
            "50",
            "1 cup",
            "3 hours",
            "Steak",
            "Potatoes"
        ]
    }
}
```

## Databases

### Leaderboard

Stored in `db/leaderboard.json`.

Contains:

```json
[
    {
        "name": "John Smith",
        "score": 1000,
        "timestamp": 1623766553130
    },
    {
        "name": "Peter Johnson",
        "score": 800,
        "timestamp": 1623773753155
    }
]
```

### Questions

Stored in `db/questions.json`.

Contains:

```json
{
    "nutrition": [
        {
            "id": "5393b83f-1d78-4e42-961c-b419872d2814",
            "question": "What is an apple?",
            "type": "multiple-choice",
            "difficulty": 1,
            "answer": "A fruit,",
            "options": [ "A fruit", "an orange" ]
        },
        {
            "id": "10862e1d-442c-418a-903d-d8435cb2f6ac",
            "question": "Is a mango a fruit or vegetable?",
            "type": "text",
            "difficulty": 1,
            "answer": "fruit"
        },
    ]
}
```

### Generated Maths Question

Stored in variable `SESSION_QUESTIONS`.
Generated on request to server for questions.

Contains:

```json
{
    "fdd06a20-3fc2-49e4-b21b-aa5b36066414": {
        "answers": [ 1, 34, -3, 7, 20, 100, 2,  6, 9, 0 ],
        "expires": "1623902562311",
        "difficulty": 1
    }
}
```

The key for each question is a UUID referred to as the session_token.
