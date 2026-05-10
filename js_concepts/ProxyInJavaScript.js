// ============================== Proxy in JavaScript  ===========================================
      /*

                      Think of Proxy as a security guard / middleman sitting in front of an object.

                      If someone tries to read a property (p.a) → the proxy can intercept it.

                      If someone tries to write a property (p.a = 10) → the proxy can intercept it.

                      Proxy can allow, change, block, log, or fake the data

                      1. in the below code we get p.a as 100 which is fake

                      2. we cannot set p.a we are Blocked to do so

                      3. we can set p.b just like normal obj set value

                      p.a is unmutable and fake read because we are set p = new Proxy(target, handler)

      */

      const target = { a: 1 };

      const p = new Proxy(target, {
        get(obj, prop) {
          if (prop === "a") return 100;

          return Reflect.get(obj, prop);
        },

        set(obj, prop, value) {
          if (prop === "a") return false;

          return Reflect.set(obj, prop, value);
        },
      });

      console.log(p.a);

      p.b = 5;

      console.log(target.b);

      p.a = 999;

      console.log(target.a); 
      
      // ============================== Proxy in JavaScript ============================================