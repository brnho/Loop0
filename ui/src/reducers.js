import { combineReducers } from 'redux';

import { FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, ADD_EVENT_SUCCESS } from './actions.js';

const initialEventsState = {
	isFetching: false,
	items: [
		{
			id: null,
			name: null,
			description: null,
			imageURL: null,
			date: null,
		},
	],
};

function eventsReducer(state = initialEventsState, action) { 
	switch (action.type) {
		case FETCH_EVENTS_REQUEST:
			return Object.assign({}, state, { isFetching: true });
		case FETCH_EVENTS_SUCCESS:
			return Object.assign({}, state, { isFetching: false, items: action.events });
		case ADD_EVENT_SUCCESS:
			return Object.assign({}, state, { items: [...state.items, action.event] });
		default:
			return state;
	}
}

const reducer = combineReducers({ 
	events: eventsReducer, //eventsReducer is passed states.events
});

export default reducer;


