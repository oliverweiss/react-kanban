
import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';

export default class Notes extends React.Component {
	constructor(props) {
		super(props);
		
		this.renderNote = this.renderNote.bind(this);
	}

	render() {
		const notes = this.props.items;
		return (
			<ul className='notes' {...this.props}>
				{notes.map(this.renderNote)}
			</ul>);
	}
		
	renderNote(note) {
		return (
			<Note id={note.id} key={`note${note.id}`} {...this.props}>
				<Editable
					value={note.task}
					onEdit={this.props.onEdit.bind(null, note.id)}
					onRemove={this.props.onRemove.bind(null, note.id)}/>
			</Note>
		);
	}
}