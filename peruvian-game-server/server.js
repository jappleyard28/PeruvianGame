const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();
const PORT = process.env.PERUVIAN_PORT;
const PATH_TO_VUE = "../peruvian-game-vue";

// Middleware to serve the vue site
const staticFileMiddleware = express.static(`${PATH_TO_VUE}/dist`);

// call for unredirected requests
app.use(staticFileMiddleware);

// Allow for use of history api
app.use(history({
  index: `${PATH_TO_VUE}/dist/index.html`
}));

// call for redirected requests
app.use(staticFileMiddleware)

// Any API calls
app.get('/api/leaderboard', (req, res) => {});

// Make server listen on port specified by environment variable or default port 3000
app.listen(PORT || 3000, () => {
  console.log("Server started");
});