// ============================== Firts Class Functions  ===========================================
/*

              JavaScript functions are first‑class citizens, meaning:

                      Functions can be stored in variables

                      Functions can be passed as arguments

                      Functions can be returned from other functions

*/

// 1. Function Statements aka Function Decleration -> Hoisted, You can safely call a() anywhere in the code.

function a() {
  console.log("a called");
}

a(); 

// 2. Function Expressions - NOT hoisted

var b = function () {
  console.log("b called");
};

b(); 

// 3. Anonymus Function - Anonymous functions are allowed only when used as values.

/*

                                    Uncaught SyntaxError: Function statements require a function name

                                        function() {
                                            console.log("Anonymous");    
                                        }

*/ 


// 4. Named Function Expression - The name is local to the function only

var b = function namedFunc() {
  console.log("Hello");
};

b(); // ✅ works
// namedFunc();  // ❌ ReferenceError


// 5. Difference bewteen parameters and argumnets

// what we get is parameters
var c = function (param1, param2) {
  console.log(param1 + param2);
}; 

c(1, 2);  // what we pass is an argument

// 6. First Class Function - Ability to be used as a value,

var fc = function f(param) {
  return function x() {
    console.log(param);
  };
};

const innerFn = fc("Hello");

innerFn(); // Hello


// 7. Arrow Function
/*

              No function keyword

              Lexical this (does NOT have its own this)

              Always an expression

*/

const sum = (a, b) => a + b;

// ============================== Firts Class Functions  ===========================================
