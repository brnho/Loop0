import React from 'react';
import PropTypes from 'prop-types';

export default function EventList({ events }) {
	const items = events.map((event, i) => (
		<li key={i}>{event.name} - {event.description}</li>
	));
	return (
		<ul>
			{items}
		</ul>
	);
}

EventList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})
	),	
};