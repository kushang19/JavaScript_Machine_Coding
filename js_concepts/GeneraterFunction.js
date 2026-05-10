      // ============================== Generater Function  ===========================================
      /*

                      Generater Function: function which can pause and resume

                     

                      yield --> specific output

                     

                      generater function cannot be called directly, need to create instance  --> let simpleGen = genFun();

                     

                      simpleGen.next() --> {value: "", done: bool }

                  */ // Eg.1

      function* genFun() {
        console.log("Gen Log...");

        yield 20;

        yield 30;

        let x = 1000;

        yield x;

        let y = "Kushang Gharat";

        yield y;

        console.log("Gen OUT ***");
      }

      let simpleGen = genFun();

      console.log(simpleGen.next());

      console.log(simpleGen.next());

      console.log(simpleGen.next());

      console.log(simpleGen.next());

      console.log(simpleGen.next()); //Eg.2

      function* IdGen() {
        let i = 1000;

        while (1) {
          i++;

          yield i;
        }
      }

      let dynamicId = IdGen(); // must create a new instance to call gen function

      function getNewId() {
        document.getElementById("new-id").innerHTML = dynamicId.next().value;
      } 
      // ============================== Generater Function ============================================
      