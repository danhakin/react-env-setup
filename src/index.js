import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import List from "./components/List";
import Detail from "./components/Detail";

console.log('React is up and running!');

// Initialize an appHistory to handle hash histroy and deactivate query state.
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

ReactDOM.render(
	<Router history={appHistory} onUpdate={ () => window.scrollTo(0,0) }>
		<Route path="/" component={ List } />
		<Route path="/react" component={ Detail } />
	</Router>,
	document.getElementById('app')
);