const budget = {
  value: 0,
  incomeMovements: [],
  expenseMovements: [],
  totalIncome: 0,
  totalExpense: 0,
};

// DOM Elements
const budgetValue = document.querySelector(".budget__value");
const incomeValue = document.querySelector(".budget__income--total");
const expenseValue = document.querySelector(".budget__expense--total");
const expensePercentage = document.querySelector(
  ".budget__expense--percentage"
);

const formEl = document.querySelector(".form");
const selectChoiceEl = document.querySelector(".input--choice");
const inputTask = document.querySelector(".input--task");
const inputPrice = document.querySelector(".input--value");
const btnAdd = document.querySelector(".btn--add");

const incomeList = document.querySelector(".income__list");
const incomeTotal = document.querySelector(".total--income");
const expenseList = document.querySelector(".expense__list");
const expenseTotal = document.querySelector(".total--expense");

selectChoiceEl.addEventListener("change", function (e) {
  const value = selectChoiceEl.value;
  if (value === "income") {
    inputPrice.setAttribute("placeholder", "Enter Income");
  } else {
    inputPrice.setAttribute("placeholder", "Enter Expense");
  }
});

// Clear Input Fields
const clearInput = function () {
  inputPrice.value = "";
  inputTask.value = "";
};

// Render Income on DOM
const renderDOM = function (movement, isIncome) {
  const index = isIncome
    ? budget.incomeMovements.length
    : budget.expenseMovements.length;
  const tableEl = isIncome ? incomeList : expenseList;

  // Genrate Markup
  const markup = `
    <tr class="${isIncome ? "income" : "expense"}__item">
        <td>${index}</td>
        <td>${movement.task}</td>
        <td>${movement.price}</td>
    </tr>
    `;

  tableEl.insertAdjacentHTML("beforeend", markup);
  budgetValue.textContent = `₹${budget.value}`;

  //   Update total Income Or Expense
  if (isIncome) {
    incomeTotal.textContent =
      incomeValue.textContent = `₹${budget.totalIncome}`;
  } else {
    expenseTotal.textContent =
      expenseValue.textContent = `₹${budget.totalExpense}`;
    const per = (budget.totalExpense / budget.totalIncome) * 100;
    expensePercentage.textContent = `(-${per.toFixed(2)}%)`;
  }
  clearInput();
};

const validatePrice = function () {
  console.log(incomeValue.value < 0);
  if (inputPrice.value < 0) {
    inputPrice.style.border = "1px solid red";
    document.querySelector(".input--value-error").classList.remove("hidden");
    return false;
  } else {
    inputPrice.style.border = "none";
    document.querySelector(".input--value-error").classList.add("hidden");
    return true;
  }
};

// Submit Details
formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  const isValidate = validatePrice();
  if (isValidate) {
    const choice = selectChoiceEl.value;
    const task = inputTask.value;
    const price = +inputPrice.value;

    const movement = {
      task: task,
      price: price,
    };

    // Update Budget Object
    if (choice === "income") {
      budget.incomeMovements.push(movement);
      budget.totalIncome += price;
      budget.value += price;
      renderDOM(movement, true);
    } else {
      if (price > budget.value) {
        alert("You didn't enough Money!!! 😔");
      } else {
        budget.expenseMovements.push(movement);
        budget.totalExpense += price;
        budget.value -= price;
        renderDOM(movement, false);
      }
    }

    console.log(budget);
  }
});
