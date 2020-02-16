import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Card from 'react-bootstrap/Card';

import './Event.css';

export default class Event extends React.Component {
	constructor(props) {
		super(props);
		this.state= { showMap: false };
		this.showMap = this.showMap.bind(this);
		this.hideMap = this.hideMap.bind(this);
	}

	showMap() {
		this.setState({ showMap: true });
	}

	hideMap() {
		this.setState({ showMap: false });
	}

	render() {
		const { title, description, date, imageURL, lat, lng } = this.props;
		const image = imageURL ? <img src={imageURL} /> : <img src="Bridge.jpg" />;
		const date2 = new Date(date);
		let location;
		if (!lat) {
			location = null;
		} else if (!this.state.showMap) {
			location = <div><a>{lat}, {lng}</a><a className="map-link" onClick={this.showMap}>Show Map</a></div>;
		} else {
			location = <div><a>{lat}, {lng}</a><a className="map-link" onClick={this.hideMap}>Hide Map</a></div>
		}
		let map;
		if (this.state.showMap) {
			map = (<div style={{ height: '10em', width: '100%' }}>
		        <GoogleMapReact
		          bootstrapURLKeys={{ key: 'AIzaSyBCLn3h4ZK5QieN6Itb0Z0irMnZVVY-_UE' }}
		          defaultCenter={{ lat: 40.807784, lng: -73.962836 }}
		          defaultZoom={14}
		          yesIWantToUseGoogleMapApiInternals
		        >
		        	<i className="fas fa-map-marker-alt fa-2x" lat={40.807784} lng={-73.962836}></i>
		        </GoogleMapReact>
	      	</div>);
      	}

		return (
			<Card>
				<div className='img'>
					{image}
				</div>
				<Card.Body>
			    	<Card.Title>{title}</Card.Title>
			    	<Card.Text>{description}</Card.Text>
			    	<Card.Text>{date2.toDateString()}</Card.Text>
			    	{location}
			    	{map}			    	
			  	</Card.Body>
			</Card>
		);
	}
}

Event.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	imageURL: PropTypes.string,
	lat: PropTypes.number,
	lng: PropTypes.number,
	date: PropTypes.string,
};