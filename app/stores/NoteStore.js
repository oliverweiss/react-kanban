import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);
		
		this.notes = [];
	}
	
	create(note) {
		const notes = this.notes;
		note.id = uuid.v4();
		this.setState({notes: notes.concat(note)});
	}
	
	update({id, task}) {
		let notes = this.notes;
		const idx = this.findNoteIndex(id);
		if (idx < 0) return;
		notes[idx].task = task;
		this.setState({notes});
	}
	
	delete(id) {
		const notes = this.notes;
		const idx = this.findNoteIndex(id);
		if (idx < 0) return;
		this.setState({notes: notes.slice(0, idx).concat(notes.slice(idx+1))});		
	}
	
	findNoteIndex(id) {
		const notes = this.notes;
		for (var i = 0; i < notes.length; i++) {
			if (notes[i].id === id) return i;
		}
		console.warn('Note was not found', notes, id);
		return -1;
	}

}

export default alt.createStore(NoteStore, 'NoteStore');