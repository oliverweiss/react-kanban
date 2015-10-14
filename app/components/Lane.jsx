import React from 'react';
import connect from '../decorators/connect.jsx';
import NoteStore from '../stores/NoteStore.js';
import NoteActions from '../actions/NoteActions.js';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import LaneActions from '../actions/LaneActions.js';

class Lane extends React.Component {
	render() {
		return (
			 <div className="lane">
				{this.props.children}
			</div>
		);
	}
	componentWillUnmount() { }
	storeChanged() { }
}

Lane.Header =
@connect(NoteStore)
class LaneHeader extends React.Component {
	constructor(props) {
		super(props);
		const id = props.id;
		
		this.addNote = this.addNote.bind(this, id);
		this.editLane = this.editLane.bind(this, id);
		this.removeLane = this.removeLane.bind(this, id);
	}

	render() {
		const {name, ...props} = this.props;
		return (
			<div className="lane-header" {...props}>
				<Editable className="lane-name"
					value={name}
					onEdit={this.editLane}
					onRemove={this.removeLane} />
				<div className="lane-add-note">
					<button onClick={this.addNote}>Add note</button>
				</div>
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
}

Lane.Notes = 
@connect(NoteStore)
class LaneNotes extends React.Component {
	constructor(props) {
		super(props);
		const id = props.id;
		
		this.removeNote = this.removeNote.bind(this, id);
		this.dragNote = this.dragNote.bind(this, id);
		this.dropNote = this.dropNote.bind(this, id);
	}

	render() {
		const {items, ...props} = this.props;
		
		return (
			<Notes items={NoteStore.get(items)}
				onEdit={this.editNote}
				onRemove={this.removeNote}
				onDrop={this.dropNote}
				dragNote={this.dragNote} />
		);
	}

	editNote(id, task) {
		NoteActions.update({id, task});
	}
	
	removeNote(laneId, noteId) {
		LaneActions.detach({laneId, noteId});
		NoteActions.delete(noteId);
	}
	
	dropNote(targetLaneId, targetNoteId, ev) {
		LaneActions.drop(sourceLaneId, sourceNoteId, targetLaneId, targetNoteId);
	}
	
	dragNote(laneId, noteId, ev) {
		ev.dataTransfer.effectAllowed = 'move';
		ev.dataTransfer.setData("text", JSON.stringify({laneId, noteId}));
		console.log(`Note dragged: ${laneId}, ${noteId}.`);
	}
	
//	onDrop(id, ev) {
//		console.log(`Drop note: ${id}.`);
//		ev.preventDefault();
//	    const data = ev.dataTransfer.getData("text");
//		console.log(`Drop note: ${data} over ${id}.`);
//	}


}

export default Lane;