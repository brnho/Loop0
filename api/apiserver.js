require('dotenv').config();
require('./db.js');
const express = require('express');
const formData = require("express-form-data");
const cloudinary = require('cloudinary');
const cors = require('cors');

const { installHandler } = require('./api_handler.js');

const app = express();

app.use(formData.parse()); //middleware for parsing form data (ex images)

const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
app.use(cors({ origin }));

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})

installHandler(app); //install apollo server middleware

app.post('/image-upload', (req, res) => {
	const image = Object.values(req.files)[0];
	cloudinary.uploader.upload(image.path, (result) => {
		res.json(result);
	});
});

const port = process.env.API_SERVER_PORT || 3000;
app.listen(port, () => {
	console.log(`API server started on port ${port}`);
});
