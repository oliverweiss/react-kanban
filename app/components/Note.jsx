import React from 'react';

export default class Note extends React.Component {
	constructor(props) {
		super(props);
		const id = props.id;

		this.onDragStart = this.onDragStart.bind(this, id);		
		this.onDrop = this.onDrop.bind(this, id);		
	}

	render() {
		const {id, ...props} = this.props;
		
		return (
			<li className='note'
				draggable='true'
				onDragStart={this.onDragStart}
				onDrop={this.onDrop}
				onDragOver={this.allowDrop}>
				{this.props.children}
			</li>
		);
	}
	
	allowDrop(ev) { ev.preventDefault(); }
	
	onDragStart(noteId, ev) {
		this.props.dragNote(noteId, ev);
	}
	
	onDrop(noteId, ev) {
		const target = React.findDOMNode(this);
		const placement = target.offsetTop + target.offsetHeight / 2 > ev.clientY ? "before" : "after";
		this.props.dropNote(noteId, ev, placement);
	}
}