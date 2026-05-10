// ============================== Polyfill for bind()  ===========================================
      /* Polyfill is a Browser Fallback */
      let name_1 = {
        first: "Atul",

        lastName: "Gada",
      };

      function printFN(hometown, state) {
        console.log(
          this.first +
            " " +
            this.lastName +
            " is from " +
            hometown +
            ", " +
            state,
        );
      }

      const printFNLog = printFN.bind(name_1, "Kutch");

      printFNLog("Gujrat"); 
      
      /*

                      Below is our custom mybind function added in Function.prototype we behaves like .bind()

                      we are writing Pollyfill for bind function

      */

      Function.prototype.mybind = function (...args) {
        let obj = this;

        let params = args.slice(1);

        return function (...args2) {
          // obj.call(args[0]);

          obj.apply(args[0], [...params, ...args2]);
        };
      };

      const printFNLogMybind = printFN.mybind(name_1, "Mumbai");

      printFNLogMybind("Maharashtra"); 
      
// ============================== Polyfill for bind() ============================================