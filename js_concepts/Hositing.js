 // ============================== Hositing  ===========================================
      /*

                      Hositing is a concept in js where you can use function/var even before initialize it

                      before code execution js allocates Memory to our code that is the reason we see undefined even before initialize variable and in case of function our whole function is stored in Global Scope

                      for arrow function and for function expression we will get undefined if we try to invoke before initialization of that arrow function

                  */

      console.log(getName2);

      getName();

      console.log(getName);

      console.log(abc); //    getNam2();

      var getName2 = () => {
        console.log("get Name 2");
      };

      function getName() {
        console.log("get Name");
      }

      var abc = 7; 
      
      // ============================== Hositing ============================================