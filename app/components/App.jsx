import React from 'react';
import Notes from './Notes.jsx';
import uuid from 'node-uuid';

const notes = [
	{id: uuid.v4(), task: 'Learn Webpack'},
	{id: uuid.v4(), task: 'Learn React'},
	{id: uuid.v4(), task: 'Do the Laundry'},
];

export default class App extends React.Component {
	render() {
		return <Notes items={notes} />;
	}
}
