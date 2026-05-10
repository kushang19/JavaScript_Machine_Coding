// ============================== Closures  ===========================================

/*

              function along with its lexical scope bunddled together is closures

              Uses of Closures:

                  - Module Design Pattern

                  - Currying

                  - Function like once

                  - Memoize

                  - Maintaing state in async world

                  - SetTimeout

                  - Iterators

                  - and many more...

                  Interview Question : youtube.com/watch?v=eBTBG4nda2A&pp=ugUEEgJlbg%3D%3D

              */ // Eg.1

function xx() {
  var a = 7; //lexical scope for fnc yy beacuse both a and yy belongs to xx which is parent

  return function yy() {
    console.log(a);
  };
}

const zz = xx(); // zz gets yy function in return where yy remembers var a's reference not value (which is its lexical scope) because of Closures

console.log(zz);

zz(); // Eg.2

function pp() {
  var b = 100; //lexical scope for fnc qq beacuse both b and qq belongs to pp which is parent

  function qq() {
    var a = 7; //lexical scope for fnc rr beacuse both a and rr belongs to qq which is parent

    function rr() {
      console.log(a, b);
    }

    rr();
  }

  qq();
}

pp();

// ============================== Closures ============================================
