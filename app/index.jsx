import './main.css';
import React from 'react';
import App from './components/App.jsx';
import alt from './libs/alt.js';

main();

function main(){
	const app = document.createElement('div');
	
	document.body.appendChild(app);
	
	React.render(<App />, app);
}
