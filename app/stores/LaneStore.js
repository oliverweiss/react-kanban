import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from './NoteStore';
import find from '../libs/find';

class LaneStore {
	constructor() {
		this.bindActions(LaneActions);
		
		this.lanes = [{notes:[], id: uuid.v4(), name: 'Todo'}];
	}
	
	create(lane) {
		const lanes = this.lanes;
		lane.id = uuid.v4();
		lane.notes = lane.notes || [];
		lane.name = 'New Lane';
		this.setState({lanes: lanes.concat(lane)});
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
			console.warn('Note ${noteId} already attached to lane ${lane.id}');
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
			console.warn('Failed to remove note ${noteId} from lane ${laneId}');
	}
	
	
	findLaneIndex(id) {
		return find.byId(this.lanes, id);
	}
}

export default alt.createStore(LaneStore, 'LaneStore');
