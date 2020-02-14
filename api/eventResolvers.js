const mongoose = require('mongoose');
const Event = mongoose.model('Event');

async function get() {
	try {
		const events = await Event.find({});
		return events;
	} catch (e) {
		throw e;
	}
}

async function add(_, { event }) {
	try {
		const savedEvent = await Event.create(event);
		return savedEvent;
	} catch (e) {
		throw e;
	}
}

module.exports = { get, add };