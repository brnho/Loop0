import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

import Event from './Event.jsx';
import './EventList.css';

export default class EventList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getEvents();
	}

	render() {
		if (this.props.isFetching){
			return (
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			);
		}
		const items = this.props.events.map((event, i) => 
			<Event 
				key={i}
				title={event.title}
				description={event.description}
				imageURL={event.imageURL}
				lat={event.lat}
				lng={event.lng}
				date={event.date}
			/>
		);
		return (
			<div>
				{items}
				<div className="tile">
					<div className='img'>
						<img src="Bridge.jpg" />
					</div>
					<div className="tile-body">
						<table>
							<tbody>
								<tr>
									<td className='date' rowSpan="2">
										<span className='month'>Apr</span>
										<span className='day'>10</span>
									</td>
									<td className='descr-main'><a id='modal-link'>Description</a></td>
								</tr>
								<tr>
									<td className='descr-secondary'>Description 2</td>
								</tr>
							</tbody>
						</table>	
						<div className="btn-group">
							<button type="button">
								<i className="fas fa-star"></i> Interested
							</button>
							<button type="button">
								<i className="fas fa-check"></i> Going
							</button>
						</div>
						<div className="divider"></div>
						<div className='subcontent'>			 
							<i className="far fa-clock fa-fw"></i>
							Friday at 10
						</div>
						<div className='subcontent'>			 
							<i className="fas fa-map-marker-alt fa-fw"></i>
							New York, New York
						</div>
					</div>
				</div>

			</div>
		);
	}
}

EventList.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
			imageURL: PropTypes.string,
			lat: PropTypes.number,
			lng: PropTypes.number,
		})
	),	
	getEvents: PropTypes.func,
	isFetching: PropTypes.bool,
};