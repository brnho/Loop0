import fetch from 'isomorphic-fetch';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export function fetchEventsRequest() {
  return { type: FETCH_EVENTS_REQUEST };
}

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export function fetchEventsSuccess(events) {
  return { type: FETCH_EVENTS_SUCCESS, events };
}

export function fetchEvents() { //cannot be an async function...
	return async function(dispatch) { //using redux-thunk
		dispatch(fetchEventsRequest());
		const query = `query {
			events {
				id title description
			}
		}`; 
		const result = await graphQlFetch(query);
		dispatch(fetchEventsSuccess(result.events));
	}
}

async function graphQlFetch(query, variables = {}) {
	const apiEndpoint = window.ENV.UI_API_ENDPOINT; //env variables sent by the server
	try {
		const response = await fetch(apiEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query, variables })
		});
		const body = await response.text();
		const result = JSON.parse(body);

		if (result.errors) { //error returned by graphql
			console.log(`${error.extensions.code}: ${error.message}`)
		}
		return result.data;
	} catch (e) {
		console.log(`Error in sending data to server: ${e.message}`); //error thrown by fetch
    	return null;
	}
}