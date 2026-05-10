// ========================== debouceFNC ===================

const debouceFNC = (fnc, delay) => {
  let timer;

  return function () {
    clearTimeout(timmer);

    let context = this;

    let args = arguments;

    timmer = setTimeout(() => {
      fnc.apply(context, args);
    }, delay);
  };
}; 

// ========================== debouceFNC ======================

// ========================== throttlingFNC ===================

let count = 0;

const expensiveFnc = () => console.log("Expnesive!!" + " " + count++);

const throttlingFNC = (fnc, limit) => {
  let flag = true;

  return function () {
    let context = this;

    let args = arguments;

    if (flag) {
      fnc.apply(context, args);

      flag = false;

      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
};

const betterFunction = throttlingFNC(expensiveFnc, 1000);

window.addEventListener("resize", betterFunction); 

// ========================== throttlingFNC ===================