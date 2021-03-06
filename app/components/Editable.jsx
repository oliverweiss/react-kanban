import React from 'react';

export default class Editable extends React.Component {
	constructor(props) {
		super(props);
		this.renderValue = this.renderValue.bind(this);
	
		this.state = {editing:false};
		
		this.edit = this.edit.bind(this);
		this.checkEnter = this.checkEnter.bind(this);
		this.finishEdit = this.finishEdit.bind(this);
	}
	
	render() {
		const {value, onEdit, ...props} = this.props;
		const editing = this.state.editing;
		
		return (
			<div {...props}>
				{editing ? this.renderEdit() : this.renderValue()}
			</div>
		);
	}
	
	renderEdit() {
		return <input type="text"
			autoFocus={true}
			defaultValue={this.props.value}
			onBlur={this.finishEdit}
			onKeyPress={this.checkEnter} />;
	}
	
	renderValue() {
		const onRemove = this.props.onRemove;
		
		return (
			<div>
				<span onClick={this.edit} className="value">{this.props.value}</span>
				{onRemove ? this.renderRemove() : null}
			</div>
		);
	}
	
	renderRemove() {
		return <button className="remove" onClick={this.props.onRemove}>X</button>
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