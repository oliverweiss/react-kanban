import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import connect from '../decorators/connect.jsx';

@connect(NoteStore)
export default class App extends React.Component {
	render() {
		const notes = this.props.notes;
		return (
			<div>
				<button className='add-note' onClick={this.addNote}>Add</button>
				<Notes items={notes} onEdit={this.editNote} onRemove={this.removeNote}/>
			</div>
		);
	}
	
	addNote() {NoteActions.create({task: 'New task'});}
	editNote(id, task) {NoteActions.update({id, task});}
	removeNote(id) {NoteActions.delete(id);}
}
