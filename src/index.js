import 'whatwg-fetch'
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router, route } from 'preact-router';
import store from './store';
import Home from './components/Home';
import Card from './components/Card/Card';

import './style';


render((
	<div id="app">
		<Provider store={store}>
			<Router>
				<Home path="/"/>
				<Card path="/games/:id"/>
			</Router>
		</Provider>
	</div>
), document.body);
