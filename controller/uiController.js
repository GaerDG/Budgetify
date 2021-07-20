// MODULO 2 - UI Controller
var UIController = function () {

      var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        container: ".container",
        expensesPercLabel: ".item__percentage",
        dateLabel: ".budget__title--month"
      };

      var formatNumber = function( num, type ) {
        var numSplit, int, dec;
          /* + or - before a number.
          exactly two decimal points.
          comma separating the thousands.
          */

          num = Math.abs(num);
          num = num.toFixed(2); // Method of the number prototype

          numSplit = num.split(".");

          int = numSplit[0];
          if (int.length > 3) {
              int =  int.substr(0, int.length - 3) + "," + int.substr(int.length - 3 , 3); // If 2310, then 2,310
          }

          dec = numSplit[1];

          // type === "expense" ? sign = "-" : sign = "+"; ORIGINAL

          return (type === "expense" ? "-" : "+") + " " + int + "." + dec; // Compact

      };

      var nodeListForEach = function ( list, callback ) {
            for ( var i = 0; i < list.length; i++ ) {
                    callback( list[i], i );
            }
      };

      return {
          getinput: function () {

              return {
                type: document.querySelector(DOMstrings.inputType).value,    // Read value. Will be income or expense.
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat (document.querySelector(DOMstrings.inputValue).value)
              };
          },

          addListItem: function ( obj, type ) {
                var html, newHtml, element;
                // Create HTML string with placeholder text

                if ( type === "income") {

                  element = DOMstrings.incomeContainer;
                  html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div><div></div>';

                } else if ( type === "expense") {

                  element = DOMstrings.expensesContainer;
                  html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

                }

                // Replace the placeholder text with actual data
                newHtml = html.replace( "%id%", obj.id);
                newHtml = newHtml.replace( "%description%", obj.description);
                newHtml = newHtml.replace( "%value%", formatNumber(obj.value, type));

                // Insert HTML into the DOM
                document.querySelector(element).insertAdjacentHTML( "beforeend", newHtml);

          },

          deleteListItem: function (selectorID) {
                var el = document.getElementById(selectorID); // Element
                el.parentNode.removeChild(el);
          },

          clearFields: function () {
                var fields, fieldsArr;

                fields = document.querySelectorAll( DOMstrings.inputDescription + "," + DOMstrings.inputValue );

                fieldsArr = Array.prototype.slice.call( fields ); // Converts the list (returned from querySelectorAll) into an array.

                fieldsArr.forEach( function (current, index, array) {
                          current.value = "";
                });

                fieldsArr[0].focus();

          },

          displayBudget: function ( obj ) {
                var type;
                obj.budget > 0 ? type = "income" : type = "expense";

                document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
                document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "income");
                document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, "expense");

                if ( obj.percentage > 0 ) {
                      document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
                } else {
                      document.querySelector(DOMstrings.percentageLabel).textContent = "---";
                }
          },

        displayPercentages: function ( percentages ) {

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
              if ( percentages[index] > 0 ) {
                    current.textContent = percentages[index] + "%";
              } else {
                    current.textContent = "---";
              }
          });
        },

        displayMonth: function () {
          var now, year, month, months;
            now = new Date(); // Storing the date

            months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month - 1] + " " + year;
        },

        changedType: function () {
            var fields = document.querySelectorAll(
                    DOMstrings.inputType + "," +
                    DOMstrings.inputDescription + "," +
                    DOMstrings.inputValue
            );

            nodeListForEach(fields, function(cur) {
                cur.classList.toggle("red-focus");
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle("red");

        },

        getDOMstrings: function () {
            return DOMstrings;
        }
      };

});
