import React from 'react';
import connect from '../decorators/connect.jsx';
import NoteStore from '../stores/NoteStore.js';
import NoteActions from '../actions/NoteActions.js';
import Notes from './Notes.jsx';

@connect(NoteStore)
export default class Lane extends React.Component {
	render() {
		const {lane, notes, ...props} = this.props;
		return (
			<div {...props}>
				<div className="lane-header">
					<div className="lane-name">{lane.name}</div>
					<div className="lane-add-note">
						<button onClick={this.addNote}>Add note</button>
					</div>
				</div>
				<Notes items={notes} onEdit={this.editNote} onRemove={this.removeNote} />
			</div>
		);
	}
	
	addNote() {
		NoteActions.create({task: "New task"});
	}
	
	editNote(id, task) {
		NoteActions.update({id, task});
	}
	
	removeNote(id) {
		NoteActions.delete(id);
	}
}