import React from 'react';
import Notes from './Notes.jsx';
import uuid from 'node-uuid';

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			notes : [
				{id: uuid.v4(), task: 'Learn Webpack'},
				{id: uuid.v4(), task: 'Learn React'},
				{id: uuid.v4(), task: 'Do the Laundry'},
			]
		};
		
		this.addNote = this.addNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.editNote = this.editNote.bind(this);
		this.findNoteIndex = this.findNoteIndex.bind(this);
	}

	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button className='add-note' onClick={this.addNote}>Add</button>
				<Notes items={notes} onEdit={this.editNote} onRemove={this.removeNote}/>
			</div>
		);
	}
	
	addNote() {
		const empty = {id: uuid.v4(), task:'New task'};
		this.setState({notes: this.state.notes.concat(empty)});
	}
	
	removeNote(noteId){		
		let notes = this.state.notes;
		const idx = this.findNoteIndex(noteId);
		if (idx < 0) return;
		this.setState({notes: notes.slice(0, idx).concat(notes.slice(idx+1))});		
	}
	
	editNote(noteId, task) {
		let notes = this.state.notes;
		const idx = this.findNoteIndex(noteId);
		if (idx < 0) return;
		notes[idx].task = task;
		this.setState({notes});
	}
	
	findNoteIndex(id) {
		var notes = this.state.notes;
		for (var i = 0; i < notes.length; i++) {
			if (notes[i].id === id) return i;
		}
		console.warn('Note was not found', notes, id);
		return -1;
	}

}
