require('./main.css');

var component = require('./component.jsx');
var app = document.createElement('div');

document.body.appendChild(app);

app.appendChild(component());