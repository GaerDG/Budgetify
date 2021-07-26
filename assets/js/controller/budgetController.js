// Budget CRUD

// Create (Income/Expense)
// Read (Income/Expense)
// Update Budget
// Delete (Income/Expense)
class Income {
	constructor ( id, description, value ) {
		this.id = id;
		this.description = description;
		this.value = value;
	}
}

class Expense {
	constructor ( id, description, value, percentage ) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	}
}



class Budget {

	constructor ( id, description, value, percentage ) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
		this.data = {
			allItems: {
				expense: [],
				income: []
			},
			totals: {
				expense: 0,
				income: 0
			},
			budget: 0,
			percentage: -1
		};
	}


	calcPercentage ( totalIncome ) {
		if ( totalIncome > 0 ) {
			this.percentage = Math.round ( (this.value / totalIncome) * 100 );
		}	else {
			this.percentage = -1;
		}
	}

	getPercentage () {
		return this.percentage;
	}

	updatePercentages() {

		// 1. Calculate percentages
		this.budgetCtrl.calculatePercentages();

		// 2. Read percentages from the budget controller
		const percentages = this.budgetCtrl.getPercentages();

		// 3. Update the UI with the new percentages
		this.uiCtrl.displayPercentages( percentages );
	}

	calculateTotal ( type ) {
		const data = this.data;
		let sum = 0;

		data.allItems[type].forEach( function (cur) {
			sum += cur.value;
		});
		data.totals[type] = sum;
	}

	addItem ( type, desc, val) {
		let newItem, ID;
		const data = this.data;

		// ID [ 1 2 3 4 5], next ID = 6
		// ID [ 1 2 4 6 8], next ID = 9
		// ID = last ID + 1

		// Create new ID
		console.log(data.allItems[type], type);
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
	}

	deleteItem ( type, ID ) {
		// ID = 6
		// ids = [ 1 2 4 6 8]
		// Index = 3
		const data = this.data;

		const ids = data.allItems[type].map( function(current) {
			return current.id;
		});

		// Returns the index number of the id in the array
		let index = ids.indexOf(ID);

		if (index !== -1) {
			data.allItems[type].splice( index, 1 );
		}
	}

	calculateBudget() {

		const data = this.data;
		// Calculate total income and expenses
		this.calculateTotal( 'expense');
		this.calculateTotal( 'income');

		// Calculate the budget: income - expenses
		data.budget = data.totals.income - data.totals.expense;

		// Calculate the percentage of income that is spent
		if ( data.totals.income > 0 ) {
			data.percentage = Math.round( (data.totals.expense / data.totals.income) * 100 );
		} else {
			data.percentage = -1;
		}
	}

	updateBudget() {

		// 1. Calculate the budget
		this.budgetCtrl.calculateBudget();

		// 2. Return the budget
		const budget = this.budgetCtrl.getBudget();

		// 3. Display the budget on the UI
		this.uiCtrl.displayBudget(budget); // !!!!!!!!!!! Careful here

	}

	calculatePercentages() {
		const data = this.data;

		data.allItems.expense.forEach(function (cur) {
			cur.calcPercentage( data.totals.income );
		});
	}

	getPercentages() {
		const data = this.data;

		const allPerc = data.allItems.expense.map( function (cur) {
			return cur.getPercentage();
		});
		return allPerc;
	}

	getBudget() {
		const data = this.data;
		return {
			budget: data.budget,
			totalInc: data.totals.income,
			totalExp: data.totals.expense,
			percentage: data.percentage
		};
	}

	/*
	testing() {
		const data = this.data;
		console.log(data);
	}
*/

}
