import React from 'react';

export default class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			location: '',
			description: '',
			invalidFields: {},
		};
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(e) {
		const obj = {};
		obj[e.target.name] = e.target.value;
		this.setState(obj);
	}

	render() {
		const { name, location, description } = this.state;
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="name">Name</label>
				<input name="name" onChange={this.onInputChange} placeholder="Event Name" value={name} />
				<label htmlFor="location">Location</label>
				<input name="location" onChange={this.onInputChange} placeholder="Location" value={location} />
				<button type="submit">Submit</button>
			</form>
		);
	}
}
