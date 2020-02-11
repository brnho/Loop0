var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../models.js');
const Event = mongoose.model('Event');

async function reset() {
	try {
		const dbURI = 'mongodb+srv://brian:CtA00CPWEjc4GTz0@cluster0-n6xfz.mongodb.net/test?retryWrites=true&w=majority';
		mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		mongoose.connection.on('connected', () => {
			console.log(`Mongoose connected to ${dbURI}`);
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected');
		});

		await Event.deleteMany({});
		const eventsDB = [
		  {
		    title: 'beach party',
		    description: 'happy times',
		  },
		  {
		  	title: 'grill',
		    description: 'come thru',		    
		  },
		];
		const savedEvents = await Event.create(eventsDB)
		const count = await Event.countDocuments({});
		console.log('Inserted', count, 'events');
	} catch (e) {
		console.log(err);
	} finally {
		mongoose.connection.close()
	}
}

reset();






