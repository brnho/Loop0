import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';

import './EventForm.css';
import DateInput from './DateInput.jsx';

export default class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			location: '',
			description: '',
			date: new Date(),
			invalidFields: {},
			selectedFile: null,
			imagePreviewUrl: '',
			modalVisible: false,
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleModalOpen = this.handleModalOpen.bind(this);
		this.handleModalHide = this.handleModalHide.bind(this);
		this.handleImageRemove = this.handleImageRemove.bind(this);
	}

	onInputChange(e) {
		const obj = {};
		obj[e.target.name] = e.target.value;
		this.setState(obj);
	}

	onDateChange(date) {
		this.setState({ date: date });
	}

	onSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.selectedFile);
		const partialEvent = {
			title: this.state.title,
			description: this.state.description,
			date: this.state.date,
		};
		this.props.addEvent(partialEvent, formData);
		this.setState({ modalVisible: false });
	}

	onImageChange(e) {
		this.setState({ selectedFile: e.target.files[0] });
		let reader = new FileReader();
		reader.onloadend = () => {
			this.setState({ imagePreviewUrl: reader.result });
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	handleImageRemove() {
		this.setState({ 
			selectedFile: null,
			imagePreviewUrl: '' 
		});
	}

	handleModalOpen() {
		this.setState({ modalVisible: true });
	}

	handleModalHide() {
		this.setState({
			title: '',
			location: '',
			description: '',
			date: new Date(),
			invalidFields: {},
			selectedFile: null,
			imagePreviewUrl: '',
			modalVisible: false,
		});
	}

	render() {
		if (this.props.isFetching) return null;

		const { title, location, description, date, modalVisible } = this.state;
		let imagePreview;
		let imageInput;
		if (this.state.imagePreviewUrl) {
			imagePreview = (<div className="img-div">
				<img src={this.state.imagePreviewUrl} />
				<button onClick={this.handleImageRemove}>X</button>
			</div>);
		} else {
			imageInput = (<label className="file-upload">
				Image Upload
				<Form.Control 
					type="file"
					accept="image/jpeg, image/gif"
					name="date" 
					onChange={this.onImageChange} 
				/>
			</label>);
		}
		const disabled = this.state.selectedFile && description && date && title ? false : true;
		return(
			<React.Fragment>
				<Button onClick={this.handleModalOpen}>Create Event</Button>
				<Modal show={modalVisible} onHide={this.handleModalHide}>
					<Modal.Header>Event Form</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.onSubmit}>
							<Form.Group as={Row}>
								<Form.Label column sm={3}>Title</Form.Label>
								<Col sm={9}>
									<Form.Control 
										type="text" 
										name="title" 
										onChange={this.onInputChange} 
										placeholder="Event Title" 
										value={title} 
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={3}>Description</Form.Label>
								<Col sm={9}>
									<Form.Control 
										type="text" 
										name="description" 
										onChange={this.onInputChange} 
										placeholder="Description" 
										value={description} 
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={3}>Date</Form.Label>
								<Col sm={9}>
									<Form.Control 
										as={DateInput}
										name="date" 
										onDateChange={this.onDateChange} 
										date={date}
									/>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column sm={3}>Image</Form.Label>
								<Col sm={9}>
									{imageInput}
									{imagePreview}
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Col sm={{ span: 6, offset: 3 }}>
					                <ButtonToolbar>
		                  				<Button type="submit" onClick={this.onSubmit} disabled={disabled}>Submit</Button>
		                  				&nbsp;
				                    	<Button onClick={this.handleModalHide}>Back</Button>
					                </ButtonToolbar>
              					</Col>
							</Form.Group>
						</Form>
					</Modal.Body>
				</Modal>
			</React.Fragment>
		);
	}
}

EventForm.propTypes = {
	isFetching: PropTypes.bool,
	addEvent: PropTypes.func,
};
