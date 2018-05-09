import React, { Component } from 'react';
import { AboutMe } from '../../components/index.js';
import { MoveArea } from '../index.js';
import { loadArticle } from '../../actions/index.js';
import { Link } from 'react-router-dom'
import './index.less';

export default class LeftArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusKey: ''
		};
	}

	handleClick() {
		alert('leftA1rea1')
	}
	render() {
		let { articles } = this.props;
		let msg = ['hel2l3o232311', ' ', 'world']
		console.log('render left area -->')
		if (!articles) {
			return (
				<div className="container">
					<span onClick={this.handleClick.bind(this)}>LeftArea1</span>
					<Link to="/home">go home</Link>

					<br />
					<ul>
						{msg.map((m, idx) => <li key={idx}>{m}</li>)}
					</ul>
				</div>
			);
		} else {
			return (
				<div className="container">
					LeftArea2
					<AboutMe setKey={this.setKey.bind(this)} />
					<MoveArea setKey={this.setKey.bind(this)} focusKey={this.state.focusKey} articles={articles} />
					{this.props.children}
				</div>
			);
		}
	}
	setKey(key) {
		this.setState({
			focusKey: key
		});
	}
}