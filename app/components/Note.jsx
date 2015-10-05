import React from 'react';

export default class Note extends React.Component {
	render() {
		return <h1>{this.props.task}</h1>;
	}
}