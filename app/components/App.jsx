import AltContainer from 'alt/AltContainer';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<button className='add-note' onClick={this.addNote}>Add</button>
				<AltContainer
					stores={[NoteStore]}
					inject={{items: () => NoteStore.getState().notes }}
				>	
					<Notes onEdit={this.editNote} onRemove={this.removeNote}/>
				</AltContainer>
			</div>
		);
	}
	
	addNote() {NoteActions.create({task: 'New task'});}
	editNote(id, task) {NoteActions.update({id, task});}
	removeNote(id) {NoteActions.delete(id);}
}
