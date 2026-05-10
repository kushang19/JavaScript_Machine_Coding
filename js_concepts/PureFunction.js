// ============================== Pure Function =====================================
      /*

                  A pure function is a function that:

                  ✅ Rule 1: Same input → same output

                  It will always return the same result for the same arguments.

                  ✅ Rule 2: No side effects

                 

                  It does NOT Modify external variables

                  It does NOT Change objects passed from outside

                  It does NOT Access or modify global state

                  It does NOT Do things like console.log, fetch, Date.now(), Math.random()

         */ 
      
      // 1. Pure

      function add(a, b) {
        return a + b;
      }

      add(2, 3); // always 5

      add(2, 3); // always 5

      
      // 2. Impure

      let total = 0;

      function addToTotal(x) {
        total += x; //Uses external variable

        return total;
      } 
      
// ============================== Pure Function ========================