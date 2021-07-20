// For authentication feature use dotenv
const sqlite3 = require('sqlite3');
const express = require('express');

const sqlite = sqlite3.verbose();

// Check for let declaration
// Connecting the database and opening it from memory
let db = new sqlite.Database('./database/budget.db', sqlite.OPEN_READWRITE, (error) => {
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
// db.run('CREATE TABLE Programing(Langs)');

// Inserting rows

/* db.run('INSERT INTO Programing(Langs) VALUES(?)', ['C++'], (error) => {
	if (error) {
		return console.log(error.message);
	}
	// Getting the last insert id
	console.log(`A row has been inserted! The rowid is ${this.lastID}. Rows inserted: ${this.changes}`);
	console.log(this.lastID);
});
*/

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
