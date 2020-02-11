require('dotenv').config();
require('./db.js');
const express = require('express');
const { installHandler } = require('./api_handler.js');

const app = express();

installHandler(app); //install apollo server middleware

const port = process.env.API_SERVER_PORT || 3000;
app.listen(port, () => {
	console.log(`API server started on port ${port}`);
});
