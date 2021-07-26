class GlobalController {

	constructor ( budgetCtrl, uiCtrl ) {
		this.budgetCtrl = budgetCtrl;
		this.uiCtrl = uiCtrl;
	}

	init () {
		console.log('Application is running.');
		this.uiCtrl.displayMonth();
		this.uiCtrl.displayBudget({
			budget: 0,
			totalInc: 0,
			totalExp: 0,
			percentage: -1
		});
	}

	saveItem (newItem) {
		console.log(newItem);
		fetch('/finance', {
			method: 'post',
			headers: { 'Content-Type': 'text/plain' },
			data: JSON.stringify(newItem)
		}).then((res) =>{
			console.log(res);
		}).catch((err) =>{
			console.log(err);
		});
	}

	setupEventListeners () {
		// !!!!!!!!!!!!
		const self = this;
		const DOM = this.uiCtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', () => { self.ctrlAddItem();} );

		document.addEventListener('keypress', function (event) {
			// KeyCode for enter = 13
			if ( event.keyCode === 13 || event.which === 13 ) {
				self.ctrlAddItem();
			}

		});

		document.querySelector(DOM.container).addEventListener('click', (event) => {
			self.ctrlDeleteItem(event);
		});
		document.querySelector(DOM.inputType).addEventListener('change', (event) => {
			self.uiCtrl.changedType();
		});
	}


	ctrlAddItem() {

		// 1. Get input data
		const input = this.uiCtrl.getInput();

		if ( input.description !== '' && !isNaN( input.value ) && input.value > 0 ) {

			// 2. Add the item to the budget Controller
			const newItem = this.budgetCtrl.addItem( input.type, input.description, input.value );

			// Sending the new item
			this.saveItem(newItem);

			// 3. Add the new item to the UI
			this.uiCtrl.addListItem( newItem, input.type );

			// 4. Clear the fields
			this.uiCtrl.clearFields();

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
			this.budgetCtrl.deleteItem(type, ID);

			// 2. Delete the item from the UI
			this.uiCtrl.deleteListItem(itemID);

			// 3. Update and show the new budget
			this.updateBudget();

			// 4. Calculate and update percentages
			this.updatePercentages();
		}
	}

}
