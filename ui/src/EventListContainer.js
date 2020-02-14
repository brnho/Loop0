import { connect } from 'react-redux';

import EventList from './EventList.jsx';
import { fetchEvents } from './actions.js';

function mapStateToProps(state) {
	return { 
		events: state.events.items, 
		isFetching: state.events.isFetching,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getEvents: () => dispatch(fetchEvents()),
	};
}

const EventListContainer = connect(mapStateToProps, mapDispatchToProps)(EventList);

export default EventListContainer;
