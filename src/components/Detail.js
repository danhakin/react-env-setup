import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {

	constructor(props){
		super(props);

		this.state = { 
			urls: {
					"commits" : 'https://api.github.com/repos/facebook/react/commits',
					"forks"   : 'https://api.github.com/repos/facebook/react/forks',
					"pulls"   : 'https://api.github.com/repos/facebook/react/pulls'
			},
			mode: 'commits',
			commits: [],
			forks: [],
			pulls: []
		};
	}

	componentWillMount() {	

		this.loadData("commits", "Error fetching commits from Github", (results) => {
			this.setState({commits: results});
		});

		this.loadData("forks", "Error fetching forks from Github", (results) => {
			this.setState({forks: results});
		});

		this.loadData("pulls", "Error fetching pulls from Github", (results) => {
			this.setState({pulls: results});
		});

	}

	loadData(type, error_msg, callback) {
		console.log('loading data for ' + type);

		ajax.get(this.state.urls[type])
			.end((error, response) => {
				if (!error && response) {
					console.dir(type, response.body);
					callback(response.body);
				} else {
					console.log(error_msg, error);
				}
			});

	}

	showCommits() {
		this.setState({ mode: 'commits'});
	}

	showForks() {
		this.setState({ mode: 'forks'});
	}

	showPulls() {
		this.setState({ mode: 'pulls'});
	}

	renderCommits() {
		console.log('renderCommits');
		const commits = this.state.commits || [];

		return commits.map((commit, index) => {
			const author = commit.author ? commit.author.login : 'Anonymous';

			return (
			<p key={index}>
				<strong>{author}</strong>
				<a href={commit.html_url}>{commit.commit.message}</a>
			</p>
			);
		});
	}

	renderForks() {
		console.log('renderForks');
		const forks = this.state.forks || [];

		return forks.map((fork, index) => {
			const owner = fork.owner ? fork.owner.login : 'Anonymous';

			return (
			<p key={index}>
				<strong>{owner}</strong>
				<a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
			</p>
			);
		});
	}

	renderPulls() {
		console.log('renderPulls');
		const pulls = this.state.pulls || [];

		return pulls.map((pull, index) => {
			const user = pull.user ? pull.user.login : 'Anonymous';

			return (
			<p key={index}>
				<strong>{user}</strong>
				<a href={pull.html_url}>{pull.body}</a>.
			</p>
			);
		});
	}

	render() {
		let content;

		if (this.state.mode === 'commits') {
			content = this.renderCommits();
		} else if (this.state.mode === 'forks') {
			content = this.renderForks();
		} else if (this.state.mode === 'pulls') {
			content = this.renderPulls();
		}

		return ( 
			<div>
				<button onClick={this.showCommits.bind(this)}>Show Commits</button>
				<button onClick={this.showForks.bind(this)}>Show Forks</button>
				<button onClick={this.showPulls.bind(this)}>Show Pulls</button>
				{content}

			</div>
		);
	}



}

export default Detail;