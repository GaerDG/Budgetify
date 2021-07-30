class UICtrl {

	constructor () {
		this.DOMstrings = {
			inputType: '.add__type',
			inputDescription: '.add__description',
			inputValue: '.add__value',
			inputBtn: '.add__btn',
			incomeContainer: '.income__list',
			expensesContainer: '.expenses__list',
			budgetLabel: '.budget__value',
			incomeLabel: '.budget__income--value',
			expenseLabel: '.budget__expenses--value',
			percentageLabel: '.budget__expenses--percentage',
			container: '.container',
			expensesPercLabel: '.item__percentage',
			dateLabel: '.budget__title--month'
		};
	}

	// Num comes from: inputValue
	// Type comes from: inputType
	formatNumber ( num , type ) {
		/* + or - before a number.
      exactly two decimal points.
      comma format separating the thousands.
      */

		num = Math.abs(num);
		num = num.toFixed(2);

		const numSplit = num.split('.');

		let int = numSplit[0];
		if (int.length > 3) {
			int =  int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3 , 3); // If 2310, then 2,310
		}

		const dec = numSplit[1];

		return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;

	}

	nodeListForEach ( list, callback ) {
		for ( let i = 0; i < list.length; i++ ) {
			callback( list[i], i );
		}
	}

	getInput() {
		return {
			// Read value. Will be income or expense.
			type: document.querySelector(this.DOMstrings.inputType).value,
			description: document.querySelector(this.DOMstrings.inputDescription).value,
			value: parseFloat (document.querySelector(this.DOMstrings.inputValue).value)
		};
	}

	addListItem( obj, type ) {
		let html;
		let newHtml;
		let element;

		// Create HTML string with placeholder text
		if ( type === 'income') {

			element = this.DOMstrings.incomeContainer;
			html = '<div class="item" id="income-%id%"><div class="item__description">%description%</div><div class="item__left"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div><div></div>';

		} else if ( type === 'expense') {

			element = this.DOMstrings.expensesContainer;
			html = '<div class="item" id="expense-%id%"><div class="item__description">%description%</div><div class="item__right"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

		}

		// Replace the placeholder text with actual data
		newHtml = html.replace( '%id%', obj.id);
		newHtml = newHtml.replace( '%description%', obj.description);
		newHtml = newHtml.replace( '%value%', this.formatNumber(obj.value, type)); // FormatNumber comes from right at top.

		// Insert HTML into the DOM
		document.querySelector(element).insertAdjacentHTML( 'beforeend', newHtml);

	}

	deleteListItem( selectorID ) {
		// Element
		const el = document.getElementById(selectorID);
		el.parentNode.removeChild(el);
	}

	clearFields() {

		const fields = document.querySelectorAll( this.DOMstrings.inputDescription + ',' + this.DOMstrings.inputValue );
		const fieldsArr = Array.prototype.slice.call( fields ); // Converts the list (returned from querySelectorAll) into an array.

		fieldsArr.forEach( function (current, index, array) {
			current.value = '';
		});

		fieldsArr[0].focus();

	}

	displayBudget( obj ) {
		let type;
		obj.budget > 0 ? type = 'income' : type = 'expense';
		
		// Reading type from DOM
		document.querySelector(this.DOMstrings.budgetLabel).textContent = this.formatNumber(obj.budget, type);
		document.querySelector(this.DOMstrings.incomeLabel).textContent = this.formatNumber(obj.totalInc, 'income');
		document.querySelector(this.DOMstrings.expenseLabel).textContent = this.formatNumber(obj.totalExp, 'expense');

		if ( obj.percentage > 0 ) {
			document.querySelector(this.DOMstrings.percentageLabel).textContent = obj.percentage + '%';
		} else {
			document.querySelector(this.DOMstrings.percentageLabel).textContent = '---';
		}
	}

	displayPercentages( percentages ) {

		const fields = document.querySelectorAll(this.DOMstrings.expensesPercLabel);

		this.nodeListForEach(fields, (current, index) => {
			if ( percentages[index] > 0 ) {
				current.textContent = percentages[index] + '%';
			} else {
				current.textContent = '---';
			}
		});
	}

	displayMonth() {
		// Storing the date
		const now = new Date();

		let months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
		let month = now.getMonth();

		let year = now.getFullYear();
		document.querySelector(this.DOMstrings.dateLabel).textContent = months[month - 1] + ' ' + year;
	}

	changedType() {
		const fields = document.querySelectorAll(
			this.DOMstrings.inputType + ',' +
                  this.DOMstrings.inputDescription + ',' +
                  this.DOMstrings.inputValue
		);

		this.nodeListForEach(fields, function(cur) {
			cur.classList.toggle('red-focus');
		});

		document.querySelector(this.DOMstrings.inputBtn).classList.toggle('red');

	}

	getDOMstrings() {
		return this.DOMstrings;
	}

}
