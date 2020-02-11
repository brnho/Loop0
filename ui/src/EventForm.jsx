import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './EventForm.css';

export default class EventForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			location: '',
			description: '',
			invalidFields: {},
			images: [],
			selectedFile: null,
			imagePreviewUrl: '',
			modalVisible: false,
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleModalClick = this.handleModalClick.bind(this);
	}

	onInputChange(e) {
		const obj = {};
		obj[e.target.name] = e.target.value;
		this.setState(obj);
	}

	async onSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', this.state.selectedFile);
		try {
			const response = await fetch('/image-upload', {
				method: 'POST',
				body: formData
			});
			const image = await response.json();
			this.setState({ 
				images: this.state.images.concat(image) ,
				selectedFile: null,
				imagePreviewUrl: '',
			});
		} catch (error) {
			console.log(error);
		}
	}

	async onImageChange(e) {
		this.setState({ selectedFile: e.target.files[0] });
		let reader = new FileReader();
		reader.onloadend = () => {
			this.setState({ imagePreviewUrl: reader.result });
		};
		reader.readAsDataURL(e.target.files[0]);
	}

	handleModalClick() {
		this.setState((prevState) => ({ modalVisible: !prevState.modalVisible }));
	}

	render() {
		const { name, location, description, modalVisible } = this.state;
		let imagePreview;
		if (this.state.imagePreviewUrl) {
			imagePreview = <img src={this.state.imagePreviewUrl} />;
		}
		const images = this.state.images.map((image, i) => (
			<img key={i} src={image.secure_url} />
		));
		const disabled = this.state.selectedFile ? false : true;
		return(
			<React.Fragment>
				<button onClick={this.handleModalClick}>Launch modal</button>
				<Modal show={modalVisible} onHide={this.handleModalClick}>
					<Modal.Header closeButton>
			         	<Modal.Title>Event Form</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
						<form onSubmit={this.onSubmit}>
							<label htmlFor="name">Name</label>
							<input name="name" onChange={this.onInputChange} placeholder="Event Name" value={name} />
							<br />
							<label htmlFor="location">Location</label>
							<input name="location" onChange={this.onInputChange} placeholder="Location" value={location} />
							<br />
							<input type="file" accept="image/png, image/jpeg, image/gif" onChange={this.onImageChange} />
							{imagePreview}
							<button type="submit" disabled={disabled}>Submit</button>
						</form>
					</Modal.Body>
				</Modal>
				{images}
			</React.Fragment>
		);
	}
}
