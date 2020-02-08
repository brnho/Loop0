require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
	const url = process.env.DB_URL;
	const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
	await client.connect();
	console.log('Connected to MongoDB at', url);
	db = client.db();
}

module.exports = { connectToDb };