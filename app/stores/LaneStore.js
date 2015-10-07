import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';

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
}

export default alt.createStore(LaneStore, 'LaneStore');
