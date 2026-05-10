      // ============================== this Keyword  ===========================================
      // 1. this in global space

      console.log("this in global space ", this); // globalObject - window, node ....
      // 2. this inside a function
      /*

        if the value of "this keyword" is null or undefined, "this keyword" will be replaced with globalObject only in non-strict mode.

        this in non-strict mode - (this substitution)

      */

      function v() {
        // value depends on strict/non-strict mode

        console.log("this inside a function ", this); // window in non strict mode, undefined in strict mode "use strict"
      } // this value depends on how it is called in window:

      v(); // in "use strict" it gives undefined

      window.v(); // in "use strict" it gives window Object
      // 3. this inside a object's methode

      const obj = {
        a: 10,

        x: function () {
          console.log("this inside a object's methode ", this); // this will point to object obj
        },
      };

      obj.x(); 
      
      // 4. call, apply bind methods (sharing methods)
      /*

          Refer above scripts for call, apply and bind .....

                  
      */
      
      // 5. this inside arrow function
      /*

        arrow function don't have their own "this keyword", they take it from their lexical enviornment where they are enclosed

       */

      const objectArrow = {
        a: 10,

        x: () => console.log("this inside arrow => ", this), // this will be a globalObject because objectArrow's lexical enviornment is window for browser. objectArrow is enclosed in global scope/space
      };

      objectArrow.x(); 
      
      // 6. this inside nested arrow function

      const objectArrowNested = {
        a: 10,

        x: function () {
          // y () console log will behave same as if we are doing console.log(this) in the current line

          const y = () => console.log("this inside nested arrow => ", this); // this will be objectArrowNested object

          y();
        },
      };

      objectArrowNested.x(); 
      
      // 7. this inside DOM --> reference to HTML element (eg, button click)
      /*  

                  1.

                  Normal function → this decided at call time

                  Arrow function → this decided at create time

                 

                      Q.

                      const obj = {

                      value: 42,

                      reg() { return function() { return this.value;}; },

                      arr() { return () => this.value; }

                      };

                      const a = obj.reg();

                      const b = obj.arr();

                      console.log(a());                 // 1

                      console.log(b());                 // 2

                      console.log(a.call({ value: 7 })); // 3

                      console.log(b.call({ value: 7 })); // 4

                      2.

                      ✅ Rule

                      If an arrow function uses curly braces {}, it becomes a block body.

                      In a block body, you must write return explicitly.

                      In arrow functions, {} can mean:

                      a block body (statements), OR

                      an object literal (a value)

                      Q.

                      const add = (a, b) => ( a + b );

                      const mul = (a, b) => ( {result: a * b} );

                      console.log(add(2, 3));

                      console.log(mul(2, 3));

                      3.

                      ✅ Noraml functions have their own arguments.

                      ✅ Arrow functions do NOT have their own arguments. so it “Find arguments in the outer scope (lexical scope), and use that.” otherwise, There is no outer arguments → ReferenceError.

                     

                      Q.

                      function f1() { return arguments.length; }

                      const f2 = () => arguments.length;

                      console.log(f1(1,2,3));

                      try {

                      console.log(f2(1,2,3));

                      } catch (e) {

                      console.log(e.name);

                      }

              */
       // ============================== this Keyword ============================================
      
      