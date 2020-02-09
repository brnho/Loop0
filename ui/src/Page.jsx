import React from 'react';

import EventListContainer from './EventListContainer.js';
import EventForm from './EventForm.jsx';

export default function Page() {
	return(
		<React.Fragment>
			<EventForm />
			<EventListContainer />
		</React.Fragment>
	);
}