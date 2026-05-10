      // ============================== Callbacks Functions  ===========================================
      // What is Callback Function is JS
      /*

      Power of Callback - callback function is the reason we get access to Async World even when JS is Sync, Single Threaded (one task at time in order)

      */

      setTimeout(function () {
        console.log("timer");
      }, 3000);

      function x(y) {
        console.log("x");

        y();
      }

      x(function y() {
        console.log("y");
      }); 
      
      /*

                  JS is Sync and Single‑Threaded Language,

                  JavaScript executes code one task at a time, in a fixed order, on a single main thread.

                  Blocking the main thread,

                  Blocking the main thread means long-running code prevents JavaScript from handling user interactions or rendering UI.

       */ 
      
      // Deep about Event Listeners
      // Closures Demo with Event Listeners
      // Scope Demo with Event Listeners

      function addEventListener() {
        let counter = 0; //Closures, Scoped

        document
          .getElementById("clicked")
          .addEventListener("click", function x() {
            console.log("Button clicked: ", ++counter);
          });
      } 
      // Grabage Collection and removeEventListeners - Best Practice is to remove Event Listneres once done using because it consumes Memory
      
      // ============================== Callbacks Function ===========================