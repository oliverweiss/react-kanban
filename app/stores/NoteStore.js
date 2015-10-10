import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';
import find from '../libs/find';

class NoteStore {
	constructor() {
		this.bindActions(NoteActions);
		
		this.notes = [];
		
		this.exportPublicMethods({
			get: this.get.bind(this)
		});
			}
	
	create(note) {
		const notes = this.notes;
		note.id = uuid.v4();
		this.setState({notes: notes.concat(note)});
	}
	
	update({id, task}) {
		const notes = this.notes;
		const idx = find.byId(notes, id);
		if (idx < 0) return;
		notes[idx].task = task;
		this.setState({notes});
	}
	
	delete(id) {
		const notes = this.notes;
		const idx = find.byId(notes, id);
		if (idx < 0) return;
		this.setState({notes: notes.slice(0, idx).concat(notes.slice(idx+1))});		
	}
	
	deletemany(ids) {
		const notes = this.notes;
		this.setState({notes: notes.filter(n => ids.every(id => id != n))});
	}
	
	get(ids) {
		const notes = this.notes;
		return (ids||[])
			.map(id => find.byId(notes, id))
			.filter(idx => idx >= 0)
			.map(idx => notes[idx]);	
	}
}

export default alt.createStore(NoteStore, 'NoteStore');
