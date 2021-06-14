# Backend

## To use

Each time you pull new commits run `yarn install` in this folder.

To start the server run

```sh
yarn start
```

## API

### `/api/leaderboard`

#### Parameters

* `limit`: (DEFAULT: 15) to specify the limit on the number of results returned
* `page`: (DEFAULT: 1) to specify an offset if a lmiit is used

#### Sample Response

```json
{
  leaderboard: [
    {"name": "john smith", "score": 1000},
    {"name": "peter johnson", "score": 800}
  ],
  page: 1
}
```
