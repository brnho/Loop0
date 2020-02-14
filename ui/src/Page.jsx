import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import EventListContainer from './EventListContainer.js';
import EventFormContainer from './EventFormContainer.js';

export default function Page() {
	return(
		<Container fluid={true}>
			<Col md={{ span: 4, offset: 4 }}>
				<EventFormContainer />
				<EventListContainer />
			</Col>
		</Container>
	);
}