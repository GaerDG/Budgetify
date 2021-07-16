// For authentication feature use dotenv
const sqlite = require('sqlite3').verbose();
const express = require('express');

// Check for let declaration
// Connecting the database and opening it from memory
const db = new sqlite.Database('./database/test.db', sqlite.OPEN_READWRITE, (error) => {
	if (error) {
		return console.error(error.message);
	}
	console.log('Successfully connected to the movements database.');
});

// There are three opening modes for the DB
// sqlite.OPEN_READONLY
// sqlite.OPEN_READWRITE
// sqlite.OPEN_CREATE

// Creating a table
// db.run('CREATE TABLE langs(name text)');

// Inserting rows
db.run('INSERT INTO langs(name text) VALUES(?)', ['C#'], (error) => {
	if (error) {
		return console.log(error.message);
	}
	// Getting the last insert idea
	console.log(`A row has been inserted! The rowid is ${this.lastID}`);
});

// Closing the database connection
db.close((error) => {
	if (error) {
		return console.error(error.message);
	}
	console.log('Database connection closed');
});



// Building the server
const app = express();
const port = 3000;

app.listen(port, () => {
	console.log('Hello! Im listening...');
});

// Testing requests
app.get('/', (req, res) => {
	res.send('Hello! Im listening...');
});
