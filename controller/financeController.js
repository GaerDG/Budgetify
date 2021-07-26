const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Sending a message from the finance controller...');
});

router.post('/', (req, res) => {
	console.log(req.body);
	res.sendStatus(201);
});

// Finanzas
// Need income
// Need expenses
// Need price

// Registro
// Need description
// Need date


// .add__type (Creates type of transaction)
// .add__description (Creates description)
// .add__value (Creates value)
// .add__btn (Creates income/expense)
// .item__delete--btn (Deletes item)

// Budget CRUD

// Create (Income/Expense)
// Read (Income/Expense)
// Update Budget
// Delete (Income/Expense)

module.exports = router;
