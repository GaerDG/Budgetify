// For authentication feature use dotenv
const sqlite3 = require('sqlite3');
const express = require('express');
const bodyParser = require('body-parser');
const financeController = require('./controller/financeController');

// Building the server
const app = express();
const path = require('path');
const port = 3000;

// Rendering HTML
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set('views', './views');

// Middleware (Parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/finance', financeController);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => {
	console.log('Hello! Im listening...');
});

// Implement REST
