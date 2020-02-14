import { connect } from 'react-redux';

import EventForm from './EventForm.jsx';
import { addEvent } from './actions.js';

function mapStateToProps(state) {
	return {
		isFetching: state.events.isFetching,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addEvent: (partialEvent, formData) => dispatch(addEvent(partialEvent, formData)),
	};
}

const EventFormContainer = connect(mapStateToProps, mapDispatchToProps)(EventForm);

export default EventFormContainer;
