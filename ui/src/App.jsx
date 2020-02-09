import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Page from './Page.jsx';
import reducer from './reducers.js';

const store = createStore(reducer);

const element = (
	<Provider store={store}>
		<h1>Hello World</h1>
		<Page />
	</Provider>
);

ReactDOM.render(element, document.getElementById('contents'));
