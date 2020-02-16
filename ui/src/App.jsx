import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Page from './Page.jsx';
import reducer from './reducers.js';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const element = (
	<Provider store={store}>
		<Page />
	</Provider>
);

ReactDOM.render(element, document.getElementById('contents'));
