import React from 'react';
import PropTypes from 'prop-types';

export default class EventList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getEvents();
	}

	render() {
		if (this.props.isFetching){
			return (<span>Loading...</span>);
		}

		const items = this.props.events.map((event, i) => (
			<li key={i}>{event.title} - {event.description}</li>
		));
		return (
			<ul>
				{items}
			</ul>
		);
	}
}

EventList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
		})
	),	
	getEvents: PropTypes.func,
	isFetching: PropTypes.bool,
};