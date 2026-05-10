// ============================== Prototype Chaining  ===========================================
      /*

                     

                      Prototype:  js engine attaches object (__proto__) to your object/array/function or whatever you create in js

                                  Therefore, Everything in JavaScript is an Object

                      let arr = []

                      arr.__proto__     ---> Array.prototype

                      arr.__proto__.__proto__     ---> Object.prototype

                      arr.__proto__.__proto__.__proto__     ---> null

                      let obj = {}

                      obj.__proto__      ---> Object.prototype

                      obj.__proto__.__proto__     ---> null

                      let fun = () => {}

                      fun.__proto__     ---> Function.prototype

                      fun.__proto__.__proto__      ---> Object.prototype

                      fun.__proto__.__proto__.__proto__      ---> null

                 

       */

      let obj1 = {
        name: "Kushang",

        city: "Mumbai",

        getIntro: function () {
          console.log(this.name + " from " + this.city);
        },
      };

      let obj2 = {
        name: "Gharat",
      }; // Never do this


      obj2.__proto__ = obj1; // Prototype Inheritance:  obj2 Inheriting properties and methodes form obj1

// ============================== Prototype Chaining =======================================================