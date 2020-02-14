const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
	title: { type: String, require: true },
	description: { type: String },
	imageURL: { type: String },
	date: { type: Date },
});

const Event = mongoose.model('Event', eventSchema);