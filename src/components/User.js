import React from 'react';
import ajax from 'superagent';


class User extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			events: []
		};
	}

	componentWillMount() {
		this.fetchFeed(this.props.params.username);
	}

	fetchFeed(username) {
		console.log('fetching feed data for ' + username);

		ajax.get(`https://api.github.com/users/${username}/events`)
			.end((error, response) => {
				if (!error && response) {
					console.dir(username, response.body);
					this.setState({ events : response.body });
				} else {
					console.log(`Error fetching ${username} events from Github`, error);
				}
			});

	}

	render() {
		let content;

		if (this.state.events) {
			content = this.renderEvents();
		} 

		return (
			<div>
				<h2>Events for {this.props.params.username}</h2>
				<ul>{content}</ul>
			</div>
		);

	}

	renderEvents() {
		const events = this.state.events || [];

		return events.map((event, index) => {
			const eventType = event.type;
			const repoName  = event.repo.name;
			const creationDate = event.created_at;

			return (
				<li key={index}>
					<strong>{repoName}</strong>: {eventType} at {creationDate}.
				</li>
			);
		});
	}

}

export default User;