//=========================== call, apply and bind is used for Function Borrowing =====================

// use function expression for printFullName

let printFullName = function(state, city){
  console.log(this.firstName + " " + this.lastName + ", " + state, " " + city);
};

const name = {
  firstName: "Kushang",
  lastName: "Gharat",
};

const name2 = {
  firstName: "Virat",
  lastName: "Kohli",
};

printFullName.call(name, "Maharashtra", "Mumbai");

printFullName.apply(name2, ["Karnataka", "Banglore"]);

let store = printFullName.bind(name, "A", "B"); // bind == call --> helps to store call for future execution

store();

//=========================== call, apply and bind is used for Function Borrowing =====================
