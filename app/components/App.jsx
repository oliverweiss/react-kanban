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
		
		this.addNote = this.addNote.bind(this);
		this.remNote = this.remNote.bind(this);
	}

	render() {
		const notes = this.state.notes;
		return (
			<div>
				<button className='add-note' onClick={this.addNote}>Add</button>
				<button className='rem-note' onClick={this.remNote}>Remove</button>
				<Notes items={notes} />
			</div>
		);
	}
	
	addNote() {
		const empty = {id: uuid.v4(), task:'New task'};
		this.setState({notes: this.state.notes.concat(empty)});
	}
	
	remNote(){
		this.setState({notes: this.state.notes.slice(0, -1)});
		console.debug("rem note!");
	}
}
