require('dotenv').config();
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const event = require('./eventResolvers.js');

const resolvers = {
	Query: {
		events: event.get,
	},
	Mutation: {
		eventAdd: event.add,
	},
	GraphQLDate,
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