// ============================== Function Currying  ===========================================

    // Function Currying using bind method

      let multiply = function (x, y) {
        console.log("Function Currying using bind: ", x * y);
      };

      const multiplyByTwo = multiply.bind(this, 2); // we are borowing multiply function and setting x permenantly to 2, this is currying, by passing 2 we curry our method

      multiplyByTwo(5); // here 5 is y

      const multiplyByThree = multiply.bind(this, 3);

      multiplyByThree(5); // Function Currying using closures

      let addition = function (x) {
        return function (y) {
          console.log("Function Currying using closures: ", x + y);
        };
      };

      addition(5)(4);

      const add2 = (a) => (b) => (c) => (d) =>
        console.log("Function Currying using closures: ", a + b + c + d);

      add2(10)(20)(30)(40); 

      // ============================== Function Currying ============================================