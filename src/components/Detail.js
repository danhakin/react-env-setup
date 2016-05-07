import React from 'react';
import Chance from 'chance';

class Detail extends React.Component {
	render() {
		return <p>Hello, {chance.first()} <br /> {this.props.message}</p>
	}
}

export default Detail;