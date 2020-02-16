const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
	title: { type: String, require: true },
	description: { type: String },
	imageURL: { type: String },
	date: { type: Date },
	lat: { type: Number },
	lng: { type: Number },
});

eventSchema.index({ title: 'text', description: 'text' });

const Event = mongoose.model('Event', eventSchema);