 // ============================== Promises  ===========================================

//               try {

//                   console.log(kushang);

//

//               } catch (error) {

//                   console.log(error);

//

//               }finally{

//                   // Clean up code..

//                   // Finally Clause will execture at every case even if we return from try block even then it will execute before the control returns to the outer code

//               }

      let ppt = new Promise((resolve, reject) => {
        let a = 1 + 1;

        if (a === 2) {
          resolve("Success");
        } else {
          reject("Failed");
        }
      });

      ppt
        .then((data) => console.log("This is a " + data))
        .catch((error) => console.log("This is a " + error));

      const v1 = new Promise((resolve, reject) => resolve("Video 1"));

      const v2 = new Promise((resolve, reject) => reject("Video 2"));

      const v3 = new Promise((resolve, reject) => resolve("Video 3")); 
      
      /*

                      1. Promise.all() Method:

                      Waits for all promises to resolve and returns their results as an array. If any promise is rejected, it immediately rejects.

       */

      Promise.all([v1, v2, v3])

        .then((data) => console.log("Promise.all --> " + data))

        .catch((error) => console.error("Promise.all error --> " + error)); 
        
        /*

                      2. Promise.allSettled() Method:

                      Waits for all promises to settle (fulfilled or rejected) Method and returns an array of their outcomes.

         */

      Promise.allSettled([
        Promise.resolve("Task 1 completed"),

        Promise.reject("Task 2 failed"),

        Promise.resolve("Task 3 completed"),
      ])

        .then((results) => console.log(results)); 
        
        /*

                      3. Promise.race() Method:

                      Promise.race() Method resolves or rejects as soon as the first promise settles.

        */

      Promise.race([
        new Promise((resolve) =>
          setTimeout(() => resolve("Task 1 finished"), 1000),
        ),

        new Promise((resolve) =>
          setTimeout(() => resolve("Task 2 finished"), 500),
        ),
      ])

        .then((result) => console.log(result)); 
        
        /*

                      4. Promise.any() Method:

                      Promise.any() Method resolves with the first fulfilled promise. If all are rejected, it rejects with an AggregateError.

        */

      Promise.any([
        Promise.reject("Task 1 failed"),

        Promise.reject("Task 2 completed"),

        Promise.resolve("Task 3 completed"),
      ])

        .then((result) => console.log(result))

        .catch((error) => console.error(error)); 
        
        /*

                      5. Promise.resolve() Method:

                      Promise.resolve() Method returns a promise that resolves with the given value.

         */

      Promise.resolve("Immediate success")

        .then((value) => console.log(value)); 
        
        /*

                      6. Promise.reject() Method:

                      Promise.reject() Method returns a promise that immediately rejects with a given reason.

        */

      Promise.reject("Immediate failure")

        .catch((error) => console.error(error)); 
        
        /*

                      7. Promise.finally() Method

                      Promise.finally() Method runs a cleanup or final code block regardless of the promise’s result (fulfilled or rejected).

        */

      Promise.resolve("Task completed")

        .then((result) => console.log(result))

        .catch((error) => console.error(error))

        .finally(() => console.log("Cleanup completed")); 
        
        
        /*

                      8. Chaining with Promise.prototype.then() Method:

                      Allows sequential execution of promises, passing results to the next .then() Method.

        */

      Promise.resolve(5)

        .then((value) => value * 2) // Multiplies by 2

        .then((value) => value + 3) // Adds 3

        .then((finalValue) => console.log(finalValue)); // Logs: 13



        
      // ============================== Promises ============================================