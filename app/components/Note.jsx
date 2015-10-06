import React from 'react';

export default class Note extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			editing: false
		};
		
		this.renderEdit = this.renderEdit.bind(this);
		this.renderTask = this.renderTask.bind(this);
		this.edit = this.edit.bind(this);
		this.finishEdit = this.finishEdit.bind(this);
	}
	
	render() {
		return (
			<div>
				{this.state.editing ? this.renderEdit() : this.renderTask()}
			</div>
		);
	}
	
	renderEdit() {
		return <input
			type='text'
			autoFocus={true}
			defaultValue={this.props.task}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	}
	
	renderTask() {
		return <h1 onClick={this.edit}>{this.props.task}</h1>;
	}
	
	edit() {
		this.setState({editing: true});
	}
	
	checkEnter(e) {
		if (e.key === 'Enter') {
			this.finishEdit(e);
		}
	}
	
	finishEdit(e) {
		this.props.onEdit(e.target.value);
		this.setState({editing: false});
	}
}