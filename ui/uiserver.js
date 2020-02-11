require('dotenv').config();
const formData = require("express-form-data");
const express = require('express');
const cloudinary = require('cloudinary')

const app = express();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
})

app.use(formData.parse())

app.use(express.static('public'));

app.get('/env.js', function(req, res) {
	const env = {
		UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
	};
	res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.post('/image-upload', (req, res) => {
	const image = Object.values(req.files)[0];
	cloudinary.uploader.upload(image.path, (result) => {
		if (result.error) {
			console.log(result);
			res.status(500).send('Error uploading image');
			return;
		}
		res.json(result);
	});
});

const port = process.env.UI_SERVER_PORT || 8000;
app.listen(port, () => {
	console.log(`UI started on port ${port}`);
});