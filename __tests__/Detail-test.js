jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Detail = require('../src/components/Detail').default;

describe('Detail', () => {

	let renderDetailComponent = function(repo_name){
		let repo = (repo_name) ? {repo: repo_name} : {repo: ''};
		return TestUtils.renderIntoDocument(
			<Detail params={repo} />
		);
	}

	it('starts with zero commits', () => {
		const rendered = renderDetailComponent();
		expect(rendered.state.commits.length).toEqual(0);
	});

	it('shows commits by default', () => {
		const rendered = renderDetailComponent();
		expect(rendered.state.mode).toEqual('commits');
	});

	it('shows forks when the button is tapped', () => {
		const rendered = renderDetailComponent();

		const forksButton = rendered.refs.forks;
		TestUtils.Simulate.click(forksButton);
		expect(rendered.state.mode).toEqual('forks');
	});

});