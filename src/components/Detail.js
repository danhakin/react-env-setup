import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {

	constructor(props){
		super(props);

		const people = [];

		for (let i = 0; i < 10; i++) {
			people.push({
				name: chance.first(),
				country: chance.country({full:true})
			});
		}

		this.state = { people };
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
				<p><strong>{this.props.message}</strong></p>
			{this.state.people.map((person,index) => (
				<div key={index}>
					<p>Hi {person.name} from {person.country} </p> 
				</div> 
			))}
				<button onClick={this.buttonClicked.bind(this)}>Update Detail</button>
			</div>
		);
	}
}

export default Detail;