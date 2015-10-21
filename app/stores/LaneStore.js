import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteActions from '../actions/NoteActions';
import NoteStore from './NoteStore';
import find from '../libs/find';

class LaneStore {
	constructor() {
		this.bindActions(LaneActions);
		
		this.lanes = [];
	}
	
	create(lane) {
		const lanes = this.lanes;
		lane.id = uuid.v4();
		lane.notes = lane.notes || [];
		lane.name = 'New Lane';
		this.setState({lanes: lanes.concat(lane)});
	}
	
	delete(id) {
		const lanes = this.lanes;
		const targetId = this.findLaneIndex(id);
	
		if (targetId >= 0) {
			const lane = lanes[targetId];
			this.setState({lanes: lanes.slice(0, targetId).concat(lanes.slice(targetId+1))});
			NoteActions.deletemany.defer(lane.notes);
		}
		else
			console.warn(`Failed to delete lane ${id}.`);
	}
	
	rename({id, name}) {
		const lanes = this.lanes;
		const targetId = this.findLaneIndex(id);
		
		if (targetId < 0) return;
		
		lanes[targetId].name = name;

		this.setState({lanes});
	}
	
	attach({laneId, noteId}) {
		if(!noteId) {
			this.waitFor(NoteStore);
			noteId = NoteStore.getState().notes.slice(-1)[0].id;
		}
		
		const lanes = this.lanes;
		const targetId = this.findLaneIndex(laneId);
		
		if (targetId < 0) return;
		
		const lane = lanes[targetId];
		
		if (lane.notes.indexOf(noteId) === -1) {
			lane.notes.push(noteId);
			this.setState({lanes});
		}
		else {
			console.warn(`Note ${noteId} already attached to lane ${lane.id}`);
		}
	}
	
	detach({laneId, noteId}) {
		const lanes = this.lanes;
		const targetId = this.findLaneIndex(laneId);
		
		if (targetId < 0) return;
		
		const lane = lanes[targetId];
		const notes = lane.notes;
		const removeIndex = notes.indexOf(noteId);
		
		if (removeIndex !== -1) {
			lane.notes = notes.slice(0, removeIndex).concat(notes.slice(removeIndex+1));
			this.setState({lanes});
		}
		else
			console.warn(`Failed to remove note ${noteId} from lane ${laneId}`);
	}
	
	drop({source, target, placement}) {
		if (source.noteId === target.noteId) return;
		
		const srcLaneIndex = this.findLaneIndex(source.laneId);
		const trgLaneIndex = this.findLaneIndex(target.laneId);
		if (srcLaneIndex < 0 || trgLaneIndex < 0) return;
		
		const srcLane = this.lanes[srcLaneIndex];
		const trgLane = this.lanes[trgLaneIndex];
		const srcNoteIndex = srcLane.notes.indexOf(source.noteId);
		const trgNoteIndex = trgLane.notes.length == 0 ? 0 : trgLane.notes.indexOf(target.noteId);
		if (srcNoteIndex < 0 || trgNoteIndex < 0) return;
		srcLane.notes = this.removeAt(srcLane.notes, srcNoteIndex);
		var insertNoteIndex = trgNoteIndex + (placement == 'after' && trgNoteIndex <= srcNoteIndex);
		trgLane.notes = this.insertAt(trgLane.notes,insertNoteIndex, source.noteId);
		this.setState({lanes: this.lanes});
	}
	
	removeAt(arr, index) {
		return arr.slice(0, index).concat(arr.slice(index+1));
	}
	
	insertAt(arr, index, item) {
		return arr.slice(0, index).concat(item).concat(arr.slice(index));
	}
	
	findLaneIndex(id) {
		return find.byId(this.lanes, id);
	}
}

export default alt.createStore(LaneStore, 'LaneStore');
