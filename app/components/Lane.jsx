import React from 'react';
import connect from '../decorators/connect.jsx';
import NoteStore from '../stores/NoteStore.js';
import NoteActions from '../actions/NoteActions.js';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions.js';

@connect(NoteStore)
export default class Lane extends React.Component {
	constructor(props) {
		super(props);
		const id = props.lane.id;
		
		this.addNote = this.addNote.bind(this, id);
		this.removeNote = this.removeNote.bind(this, id);
		this.editLane = this.editLane.bind(this, id);
		this.removeLane = this.removeLane.bind(this, id);
	}
	
	render() {
		const {lane, ...props} = this.props;
		const notes = lane.notes;
		return (
			<div {...props}>
				<div className="lane-header">
					<Editable className="lane-name"
						value={lane.name}
						onEdit={this.editLane}
						onRemove={this.removeLane} />
					<div className="lane-add-note">
						<button onClick={this.addNote}>Add note</button>
					</div>
				</div>
				<Notes items={NoteStore.get(notes)} onEdit={this.editNote} onRemove={this.removeNote} />
			</div>
		);
	}
	
	removeLane(id) {
		LaneActions.delete(id);
	}
	
	editLane(id, name) {
		LaneActions.rename({id, name});
	}
	
	addNote(laneId) {
		NoteActions.create({task: "New task"});
		LaneActions.attach({laneId});
	}
	
	editNote(id, task) {
		NoteActions.update({id, task});
	}
	
	removeNote(laneId, noteId) {
		LaneActions.detach({laneId, noteId});
		NoteActions.delete(noteId);
	}
}