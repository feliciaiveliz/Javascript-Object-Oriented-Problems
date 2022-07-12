// Our earlier implementation of the Function.prototype.bind was simplistic. Function.prototype.bind has another trick up its sleeve besides hard-binding functions to context objects. It's called partial function application. Read this assignment and the MDN documentation to learn more about partial function application.

// Alter the myBind function written in the previous exercise to support partial function application.

function add(a, b) {
  return a + b;
}

const myBind = function myBind(func, context, ...args) {
  return function() {
    console.log(...args); // 7
    console.log(...arguments); // 70
    console.log([...args, ...arguments]); // [7, 70]
    return func.apply(context, [...args, ...arguments]);
    // add calls apply and passes null as context (doesn't need the context) and the array of all arguments
  };
};

let addSeven = myBind(add, null, 7);
console.log(addSeven(70)); // 77