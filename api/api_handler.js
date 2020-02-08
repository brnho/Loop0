require('dotenv').config();
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const events = [
	{
		_id: 'xhf',
		id: 1,
		name: 'Beach Party',
		description: 'a fun time',
	},
	{
		_id: 'idh',
		id: 2,
		name: 'Coffee Chat',
		description: 'not a fun time',
	},
];

function getEvent(_, { id }) {
	return events.find((element) => element.id == id);
}

function getEvents() {
	return events;
}

const resolvers = {
	Query: {
		event: getEvent,
		events: getEvents,
	},
};

const server = new ApolloServer({
	typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
	resolvers,
});

function installHandler(app) {
	const enableCors = process.env.ENABLE_CORS;
	console.log('CORS setting:', enableCors);
	let cors;
	if (enableCors) {
		const origin = process.env.UI_SERVER_ORIGIN;
		const methods = 'POST';
		cors = { origin, methods, credentials: true };
	} else {
		cors = 'false';
	}
	server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };