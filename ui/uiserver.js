require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/env.js', function(req, res) {
	const env = {
		UI_API_GRAPHQL_ENDPOINT: process.env.UI_API_GRAPHQL_ENDPOINT,
		UI_API_IMAGE_ENDPOINT: process.env.UI_API_IMAGE_ENDPOINT,
	};
	res.send(`window.ENV = ${JSON.stringify(env)}`);
});

const port = process.env.UI_SERVER_PORT || 8000;
app.listen(port, () => {
	console.log(`UI started on port ${port}`);
});