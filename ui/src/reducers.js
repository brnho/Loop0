import { combineReducers } from 'redux';
import { 
	FETCH_EVENTS_REQUEST, 
	FETCH_EVENTS_SUCCESS, 
	ADD_EVENT_SUCCESS,
	ON_USER_CHANGE, 
} from './actions.js';

const initialEventsState = {
	isFetching: false,
	items: [
		{
			id: null,
			name: null,
			description: null,
			imageURL: null,
			date: null,
			lat: null,
			lng: null,
		},
	],
};

const initialUserState = {
	signedIn: false,
	givenName: null,
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

function userReducer(state = initialUserState, action) {
	switch (action.type) {
		case ON_USER_CHANGE:
			return { signedIn: action.signedIn, givenName: action.givenName };
		default:
			return state;
	}
}

const reducer = combineReducers({ 
	events: eventsReducer, //eventsReducer is passed states.events
	user: userReducer,
});

export default reducer;


