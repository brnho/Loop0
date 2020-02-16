import fetch from 'isomorphic-fetch';

import graphQlFetch from './graphQlFetch.js';

export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export function fetchEventsRequest() {
  return { type: FETCH_EVENTS_REQUEST };
}

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export function fetchEventsSuccess(events) {
  return { type: FETCH_EVENTS_SUCCESS, events };
}

export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export function addEventSuccess(event) {
  return { type: ADD_EVENT_SUCCESS, event };
}

export const ON_USER_CHANGE = 'ON_USER_CHANGE';
export function onUserChange({ signedIn, givenName }) {
	return { type: ON_USER_CHANGE, signedIn, givenName };
}

export function fetchEvents() { //cannot be an async function...
	return async function(dispatch) { //using redux-thunk
		dispatch(fetchEventsRequest());
		const query = `query {
			events {
				id title description imageURL date lat lng
			}
		}`; 
		const result = await graphQlFetch(query);
		dispatch(fetchEventsSuccess(result.events));
	}
}

export function addEvent(partialEvent, formData) {
	return async function(dispatch) {
		dispatch(fetchEventsRequest());
		const imageURL = await imageUpload(formData); //upload image to cloudinary, may take a while
		const event = Object.assign({}, partialEvent, { imageURL });
		const query = `mutation eventAdd($event: EventInput!) {
			eventAdd(event: $event) {
				id
			}
		}`;
		await graphQlFetch(query, { event });
		dispatch(fetchEvents());
	}
}

async function imageUpload(formData) {
	const apiEndpoint = window.ENV.UI_API_IMAGE_ENDPOINT; //env variables sent by the server
	try {
		const response = await fetch(apiEndpoint, {
			method: 'POST',
			body: formData
		});
		const image = await response.json();
		return image.secure_url;
	} catch (e) {
		console.log(`Error in sending data to server: ${e.message}`);
		return null;
	}
}
