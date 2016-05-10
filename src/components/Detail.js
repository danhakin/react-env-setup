import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			name: chance.first(),
			country: chance.country({ full:true })
		};
	}

	buttonClicked() {
		console.log('Button was clicked');
		const newState = {
			name: chance.first()
		};

		// INFO: using setState merges the original state with the new one 
		// and cause the component to re-render unless you name a function
		// shouldUpdateComponent and returns false;
		this.setState(newState);
	}

	render() {
		return ( 
			<div>
				<p>Hello, {this.state.name} </p> 
				<p>You are from {this.state.country}.</p> 
				<p>{this.props.message}</p>
				<button onClick={this.buttonClicked.bind(this)}>Update Detail</button>
			</div>
		);
	}
}

export default Detail;