// ============================== Error Handling  ===========================================
      /*

                      when an error occurs in script the execution is stopped. using try catch syntax we can catch error and instead of our script dying we can do something more reasonable.

                      try catch works synchnorously. If an exception happens in scheduled code, like in setTimeout, then try catch won't catch it

                      eg.

                      try{

                      setTimeout(() => {

                                  // if error occurs here it will not be handled

                              }, 100)

                      }

                      catch (e) {

                          console.log(e)

                      }

                      always use try catch inside setTimeout

                     

                      Custom Error:

                      try{

                          throw new Error(" This is my custom error which I can see in catch is I use it in try block")

                      }

                          catch(error){

                      }

                      error.name ==> Error (SyntaxError, ReferenceError etc..)

                      error.message ==> This is my custom error which I can see in catch is I use it in try block

                      we also get error.stack

                  */ //
      // ============================== Error Handling ============================================