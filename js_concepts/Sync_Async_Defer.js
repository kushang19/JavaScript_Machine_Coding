       // ============================== Sync, Async and Defer ===========================================
        /*

                          Sync: [HTML Parsing] --> [Fetch Script] --> [Execute Script] --> [HTML Parsing]

                        

                          Aync: [HTML Parsing] --> [HTML Parsing, Fetch Script] --> [Execute Script] --> [HTML Parsing]

                            
                              Async does not guarantees order of  Execution of Scripts

                     

                          Defer: [HTML Parsing] --> [HTML Parsing, Fetch Script] --> [HTML Parsing] --> [Execute Script]

                               Maintaince order of  Execution of Scripts

         */ 
      
      // ============================== Sync, Async and Defer ============================================