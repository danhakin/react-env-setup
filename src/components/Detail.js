import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {

	buttonClicked() {
		console.log('Button was clicked');
		this.forceUpdate();
	}

	render() {
		return ( 
			<div>
				<p>Hello, {chance.first()} </p> 
				<p>You are from {chance.country({ full: true})}.</p> 
				<p>{this.props.message}</p>
				<button onClick={this.buttonClicked.bind(this)}>Update Detail</button>
			</div>
		);
	}
}

export default Detail;