import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import GoogleButton from 'react-google-button';

export default class SigninNavItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showing: false,
			disabled: true,
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.signOut = this.signOut.bind(this);
		this.signIn = this.signIn.bind(this);
	}

	componentDidMount() {
		const clientId = window.ENV.GOOGLE_CLIENT_ID;
		if (!clientId) return;
		window.gapi.load('auth2', () => {
			if (!window.gapi.auth2.getAuthInstance()) {
				window.gapi.auth2.init({ client_id: clientId }).then(() => {
					this.setState({ disabled: false });
				});
			}
		});
	}

	async signIn() {
		this.hideModal();
		let googleToken;
		try {
			const auth2 = window.gapi.auth2.getAuthInstance();
			const googleUser = await auth2.signIn();
			googleToken = googleUser.getAuthResponse().id_token;
		} catch (error) {
			console.log(`Error authenticating with Google: ${error.error}`);
		}

		try {
			const apiEndpoint = window.ENV.UI_API_AUTH_ENDPOINT;
			const response = await fetch(`${apiEndpoint}/signin`, {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ google_token: googleToken }),
			});
			const body = await response.text();
			const result = JSON.parse(body);
			const { signedIn, givenName } = result;
			this.props.onUserChange({ signedIn, givenName });
		} catch (error) {
			console.log(`Error signing into the app: ${error}`);
		}
	}

	async signOut() {
		const apiEndpoint = window.ENV.UI_API_AUTH_ENDPOINT;
		try {
			await fetch(`${apiEndpoint}/signout`, {
				method: 'POST',
				credentials: 'include',
			});
			const auth2 = window.gapi.auth2.getAuthInstance();
			await auth2.signOut();
			this.props.onUserChange({ signedIn: false, givenName: '' });
		} catch (error) {
			console.log(`Error signing out: ${error}`);
		}		
	}

	showModal() {
		const clientId = window.ENV.GOOGLE_CLIENT_ID;
		if (!clientId) {
			console.log('Missing environment variable GOOGLE_CLIENT_ID');
			return;
		}
		this.setState({ showing: true });
	}

	hideModal() {
		this.setState({ showing: false });
	}

	render() {
		if (this.props.signedIn) {
			return (
				<DropdownButton id="dropdown-basic-button" title={this.props.givenName}>
					<Dropdown.Item onClick={this.signOut}>Sign out</Dropdown.Item>
				</DropdownButton>
			);
		}

		const { showing, disabled } = this.state;
		return (
			<React.Fragment>
				<Button variant="outline-info" onClick={this.showModal}>Log in</Button>
				<Modal keyboard show={showing} onHide={this.hideModal}>
					<Modal.Header closeButton>
						<Modal.Title>Sign in</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<GoogleButton onClick={this.signIn} />
					</Modal.Body>
				</Modal>
			</React.Fragment>
		);
	}
}

SigninNavItem.propTypes = {
	signedIn: PropTypes.bool,
	givenName: PropTypes.string,
	onUserChange: PropTypes.func,
};

