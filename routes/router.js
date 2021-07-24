const express = require('express');

const router = express.Router();


// Some routes
// .add__type (Creates type of transaction)
// .add__description (Creates description)
// .add__value (Creates value)
// .add__btn (Creates income/expense)
// .item__delete--btn (Deletes item)

router
	.route('/')
	.get()
	.post();

router
	.route('/:id')
	.get()
	.patch()
	.delete();

module.exports = router;
