import { connect } from 'react-redux';

import EventList from './EventList.jsx';

function mapStateToProps(state) {
	return { events: state.events };
}

const EventListContainer = connect(mapStateToProps)(EventList);

export default EventListContainer;
