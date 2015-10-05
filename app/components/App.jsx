import React from 'react';
import Notes from './Notes.jsx';
import uuid from 'node-uuid';

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			notes : [
				{id: uuid.v4(), task: 'Learn Webpack'},
				{id: uuid.v4(), task: 'Learn React'},
				{id: uuid.v4(), task: 'Do the Laundry'},
			]
		};
	}

	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button className='add-note' onClick={this.addNote}>Add</button>
				<Notes items={notes} />
			</div>
		);
	}
	
	addNote() {
		console.debug('New note!!');
	}
}
