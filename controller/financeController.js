const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Create item
/* router.post('/', async (req, res) => {

	const { description, value, type } = req.body;
	const movements = await prisma.finances.create({
		data: {
			description,
			value,
			type,
			date: new Date()
		},
	});
	return res.sendStatus(201);
});
*/
// Read item
/*
router.get('/', async (req, res) => {
	const allMovements = await prisma.finances();
	return res.status(200).json(allMovements);
});
*/


// Delete (Income/Expense)

module.exports = router;
