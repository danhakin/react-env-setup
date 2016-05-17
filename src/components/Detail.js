import React from 'react';
import ajax from 'superagent';
import { IndexLink, Link } from 'react-router';

class Detail extends React.Component {

	constructor(props){
		super(props);

		this.state = { 
			mode: 'commits',
			commits: [],
			forks: [],
			pulls: []
		};
	}

	componentWillMount() {
		this.fetchFeed('commits');	
		this.fetchFeed('forks');	
		this.fetchFeed('pulls');	
	}

	fetchFeed(type) {
		console.log('fetching feed data for ' + type);

		if (this.props.params.repo === '') {
			// empty remo name, bail out!
			return;
		}

		const baseUrl = 'https://api.github.com/repos/facebook';

		ajax.get(`${baseUrl}/${this.props.params.repo}/${type}`)
			.end((error, response) => {
				if (!error && response) {
					console.dir(type, response.body);
					this.setState({ [type] : response.body });
				} else {
					console.log(`Error fetching ${type} from Github`, error);
				}
			});

	}

	selectMode(mode) {
		// ES6 allows to use {mode} instead of {"mode": mode} to set the object
		this.setState({ mode });
	}

	renderCommits() {
		console.log('renderCommits');
		const commits = this.state.commits || [];

		return commits.map((commit, index) => {
			const author = commit.author ? commit.author.login : 'Anonymous';

			return (
			<p key={index}>
				<Link to={ `user/${author}` }>{author}</Link>
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
				<Link to={ `user/${owner}` }>{owner}</Link>
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
				<Link to={ `user/${user}` }>{user}</Link>  
				<a href={pull.html_url}>{pull.body}</a>.
			</p>
			);
		});
	}

	render() {
		let content;

		console.dir(this.state);

		if (this.state.mode === 'commits') {
			content = this.renderCommits();
		} else if (this.state.mode === 'forks') {
			content = this.renderForks();
		} else if (this.state.mode === 'pulls') {
			content = this.renderPulls();
		}

		return ( 
			<div>
				<p>
					You are here: <IndexLink to="/" activeClassName="active">Home</IndexLink> > {this.props.params.repo}
				</p>

				<button onClick={this.selectMode.bind(this, 'commits')} ref="commits">Show Commits</button>
				<button onClick={this.selectMode.bind(this, 'forks')} ref="forks">Show Forks</button>
				<button onClick={this.selectMode.bind(this, 'pulls')} ref="pulls">Show Pulls</button>
				{content}

			</div>
		);
	}



}

export default Detail;