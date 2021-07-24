const budget = new Budget();

// Budget CRUD

// Create (Income)
// Read (Income/Expense)
// Update Budget
// Delete (Income/Expense)

// Event listeners
app.get('/', (req, res) => {
	res.send('Hello! Im listening...');
});

class Budget {

	constructor ( id, description, value, percentage ) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	}

	getData () {
		allItems: {
			expense: [],
			income: [] // Maybe defining this object outside the class?
		},
		totals: {
			expense: 0,
			income: 0
		},
		budget: 0,
		percentage: -1
	};

	calcPercentage ( totalIncome ) {
		if ( totalIncome > 0 ) {
			this.percentage = Math.round ( (this.value / totalIncome) * 100 );
		}	else {
			this.percentage = -1;
		}
	};

	getPercentage () {
		return this.percentage;
	};

	income ( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	calculateTotal ( type ) {
		let sum = 0;
		data.allItems[type].forEach( function (cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	addItem ( type, desc, val) {
		const newItem, ID;

		// ID [ 1 2 3 4 5], next ID = 6
		// ID [ 1 2 4 6 8], next ID = 9
		// ID = last ID + 1

		// Create new ID
		if ( data.allItems[ type ].length > 0 ) {
			ID = data.allItems[ type ][ data.allItems[ type ].length - 1].id + 1;
		} else {
			ID = 0;
		}

		// Create new item
		if (type === 'expense') {
			newItem = new Expense ( ID, desc, val );
		} else if (type === 'income') {
			newItem = new Income ( ID, desc, val );
		}

		// Push it into the data structure
		data.allItems[ type ].push(newItem);

		// Return the new element
		return newItem;
	};

	deleteItem ( type, ID ) {
		const ids, index;
		// ID = 6
		// ids = [ 1 2 4 6 8]
		// Index = 3

		ids = data.allItems[type].map( function(current) {
			return current.id;
		});

		index = ids.indexOf(ID); // Returns the index number of the id in the array

		if (index !== -1) {
			data.allItems[type].splice( index, 1 );
		}
	};

	calculateBudget() {

		// Calculate total income and expenses
		calculateTotal( 'expense');
		calculateTotal( 'income');

		// Calculate the budget: income - expenses
		data.budget = data.totals.income - data.totals.expense;

		// Calculate the percentage of income that is spent
		if ( data.totals.income > 0 ) {
			data.percentage = Math.round( (data.totals.expense / data.totals.income) * 100 );
		} else {
			data.percentage = -1;
		}
	};

	calculatePercentages() {
		data.allItems.expense.forEach(function (cur) {
			cur.calcPercentage( data.totals.income );
		});
	};

	getPercentages() {
		var allPerc = data.allItems.expense.map( function (cur) {
			return cur.getPercentage();
		});
		return allPerc;
	};

	getBudget() {
		return {
			budget: data.budget,
			totalInc: data.totals.income,
			totalExp: data.totals.expense,
			percentage: data.percentage
		};
	};

	testing() {
		console.log(data);
	};

}

module.exports = Budget;
