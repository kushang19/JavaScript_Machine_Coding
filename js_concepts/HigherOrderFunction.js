// ============================== Higher Order Function ===========================
      /*

                  Function which takes input as another function (callback fnc) or return a function by itself is a Higher Order Functions.

                  IMPORTANT: All happens beacuse Functions are First class citizens in javascript

       */

      const diameter = function (radius) {
        return 2 * radius;
      }; // pollyfills

      Array.prototype.calculate = function (logic) {
        const output = [];

        for (let i = 0; i < this.length; i++) {
          output.push(logic(this[i]));
        }

        return output;
      };

      const radius_array = [1, 2, 3, 4];

      console.log("Calculate Diameter : ", radius_array.calculate(diameter));

      console.log("Calculate Diameter with map : ", radius_array.map(diameter)); // .map is a Higher order Function, we have made calculate function similar to map by added in Array's Prototye and it radius_array is now handled by "this" keyword
      
// ============================== Higher Order Function ===========================================