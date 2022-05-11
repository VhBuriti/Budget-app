const btn_add = document.getElementById("btn_add");
const div_expenses = document.getElementById("expenses");
const div_income = document.getElementById("income");
const div_all = document.getElementById("all");

const expense_price = document.getElementById("expense_price");
const expense_item = document.getElementById("expense_item");

const income_price = document.getElementById("income_price");
const income_item = document.getElementById("income_item");
const blc_value = document.getElementById("blc_value");

let income_bal_session = new Number;
let outcome_bal = new Number;

const inc_bal = document.getElementById("inc_bal");
const out_bal = document.getElementById("out_bal");



load_all();

function to_all() {
    div_expenses.style.display = "none";
    div_income.style.display = "none";
    div_all.style.display = "block";
}

function to_expenses() {
    div_expenses.style.display = "block";
    div_income.style.display = "none";
    div_all.style.display = "none";

}

function to_income() {
    div_expenses.style.display = "none";
    div_income.style.display = "block";
    div_all.style.display = "none";

}



function create_income_item(){
    const income = {
        name: income_item.value,
        price: income_price.value 
    };


    const array_income = JSON.parse(localStorage.getItem('income items')) || []
    array_income.push(income);

    const JSON_income = JSON.stringify(array_income);
    localStorage.setItem('income items', JSON_income);

    load_all();

}

function getTotalValue_income(){
    let totalValue_income = 0
    const array_income = JSON.parse(localStorage.getItem('income items')) || []
    array_income.forEach(element => {
        totalValue_income += parseFloat(element.price)
    });
    return totalValue_income
}


function show_income() {
    let parsed_income = JSON.parse(localStorage.getItem('income items'));
    const income_list = document.getElementById("income_items");
    let parsed_inc_bal = getTotalValue_income()

    let html_income = ``;
    for (const key in parsed_income) {
        element = parsed_income[key];
        html_income += `
        <li class="income">${element.name}: R$ ${element.price}</li>
    `
    }
    income_list.innerHTML = html_income;

    inc_bal.innerHTML = `R$ ${parsed_inc_bal}`;
}


function create_expense_item(){
    const expense = {
        name: expense_item.value,
        price: expense_price.value
    };
    
    const array_expense = JSON.parse(localStorage.getItem('expense items')) || []
    array_expense.push(expense);

    const JSON_expense = JSON.stringify(array_expense)
    localStorage.setItem('expense items', JSON_expense)

    load_all();

}


function getTotalValue_expense(){
    let totalValue_expense = 0
    const array_expense = JSON.parse(localStorage.getItem('expense items')) || []
    array_expense.forEach(element => {
        totalValue_expense += parseFloat(element.price)
    });
    return totalValue_expense
}



function show_expense() {
    let parsed_expense = JSON.parse(localStorage.getItem('expense items'));
    const expense_list = document.getElementById("expense_items");
    let parsed_expense_bal = getTotalValue_expense();

    let html_expense = ``;
    for (const key in parsed_expense) {
        expense_element = parsed_expense[key]

        html_expense += `
        <li class="expense">${expense_element.name}: R$ ${expense_element.price}</li>
    `
    }
    expense_list.innerHTML = html_expense;

    if(parsed_expense_bal == null){
        out_bal.innerHTML = `R$ 0`;
    }else{
        out_bal.innerHTML = `- ${parsed_expense_bal} R$`;
    }
}


function show_all() {
    let parsed_expense = JSON.parse(localStorage.getItem('expense items'));
    const all_items = document.getElementById("all_items")


    let html_expense = ``;
    for (const key in parsed_expense) {
        expense_element = parsed_expense[key]

        html_expense += `
        <li class="expense">${expense_element.name}: R$ ${expense_element.price}</li>
    `
    }


    let parsed_income = JSON.parse(localStorage.getItem('income items'));

    let html_income = ``;
    for (const key in parsed_income) {
        element = parsed_income[key]

        html_income += `
        <li class="income">${element.name}: R$ ${element.price}</li>
    `
    }


    all_items.innerHTML = html_expense + html_income;

}


function load_all() {
    show_income();
    show_expense();
    show_all();
    balance();
}

function balance(){
    let localexpense =  getTotalValue_expense();
    let localincome = getTotalValue_income();

    let bal = localincome - localexpense 

    localStorage.setItem('balance', bal);


    let parsed_bal = JSON.parse(localStorage.getItem('balance'));

    blc_value.innerHTML = `R$ ${parsed_bal}`;
}


