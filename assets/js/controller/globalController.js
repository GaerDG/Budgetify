const Budget = require('./budgetController');
const UICtrl = require('./uiController');

// This is good? Can it be reached from inside the class?
const budgetCtrl = new Budget();
const uiCtrl = new UICtrl();

class GlobalController {

	constructor ( budgetCtrl, uiCtrl ) {
		this.budgetCtrl = budgetCtrl;
		this.uiCtrl = uiCtrl;
	}

	init () {
		console.log('Application is running.');
		uiCtrl.displayMonth();
		uiCtrl.displayBudget({
			budget: 0,
			totalInc: 0,
			totalExp: 0,
			percentage: -1
		});
	}

	setupEventListeners () {

		// Is the name DOM a bad practice?
		const DOM = uiCtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', this.ctrlAddItem);

		document.addEventListener('keypress', function (event) {
			// KeyCode for enter = 13
			if ( event.keyCode === 13 || event.which === 13 ) {
				this.ctrlAddItem();
			}

		});

		document.querySelector(DOM.container).addEventListener('click', this.ctrlDeleteItem);

		document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changedType);
	}


	updateBudget() {

		// 1. Calculate the budget
		budgetCtrl.calculateBudget();

		// 2. Return the budget
		const budget = budgetCtrl.getBudget();

		// 3. Display the budget on the UI
		uiCtrl.displayBudget(budget); // !!!!!!!!!!! Careful here

	}

	updatePercentages() {

		// 1. Calculate percentages
		budgetCtrl.calculatePercentages();

		// 2. Read percentages from the budget controller
		const percentages = budgetCtrl.getPercentages();

		// 3. Update the UI with the new percentages
		uiCtrl.displayPercentages( percentages );
	}

	ctrlAddItem() {

		// 1. Get input data
		const input = uiCtrl.getinput();

		if ( input.description !== '' && !isNaN( input.value ) && input.value > 0 ) {

			// 2. Add the item to the budget Controller
			const newItem = budgetCtrl.addItem( input.type, input.description, input.value );

			// 3. Add the new item to the UI
			uiCtrl.addListItem( newItem, input.type );

			// 4. Clear the fields
			uiCtrl.clearFields();

			// 5. Calculate and update budget
			this.updateBudget();

			// 6. Calculate and update percentages
			this.updatePercentages();
		}

	}

	ctrlDeleteItem( event ) {
		//!!!!!!!!!!!!!!!!!!!! Check for those const declarations: itemID, splitID, type, ID
		const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			// Income-n
			const splitID = itemID.split('-');
			const type = splitID[0];
			const ID = parseInt ( splitID[1] );

			// 1. Delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);

			// 2. Delete the item from the UI
			uiCtrl.deleteListItem(itemID);

			// 3. Update and show the new budget
			updateBudget();

			// 4. Calculate and update percentages
			updatePercentages();
		}
	}

}

module.exports = GlobalController;
