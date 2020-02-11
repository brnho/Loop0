const mongoose = require('mongoose');
const Event = mongoose.model('Event');

async function getEvents() {
	try {
		const events = await Event.find({});
		return events;
	} catch (e) {
		throw e;
	}
}

module.exports = { getEvents };