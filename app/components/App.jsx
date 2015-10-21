import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';
import connect from '../decorators/connect.jsx';

@connect(LaneStore)
export default class App extends React.Component {
	render() {
		const lanes = this.props.lanes;
		return (
			<div>
				<button className="add-lane" onClick={this.addLane}>Add lane</button>
				<Lanes items={lanes}/>
			</div>
		);
	}
	
	addLane() {LaneActions.create({});}
}
