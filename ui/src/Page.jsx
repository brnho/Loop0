import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import EventListContainer from './EventListContainer.js';
import EventFormContainer from './EventFormContainer.js';
import Search from './Search.jsx';
import SignInNavItemContainer from './SignInNavItemContainer.jsx';
import './Page.css';

function NavBar() {
	return (
		<Navbar fixed="top" variant="dark" bg="dark">
			<Navbar.Brand>Loop</Navbar.Brand>
			<Navbar.Collapse className="justify-content-end">
				<Col sm={3}>
					<Search />
				</Col>
				<SignInNavItemContainer />
			</Navbar.Collapse>
		</Navbar>
	);
}

export default function Page() {
	return(
		<React.Fragment>
			<NavBar />
			<Container fluid={true}>
				<Col md={{ span: 4, offset: 4 }}>
					<EventFormContainer />
					<EventListContainer />
				</Col>
			</Container>
		</React.Fragment>
	);		
}