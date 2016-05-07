import React from 'react';
import ReactDOM from 'react-dom';

import Detail from "./components/Detail";

console.log('React is up and running!');

ReactDOM.render(
	<Detail message="This is coming from props!" />, 
	document.getElementById('app')
);