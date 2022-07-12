function myBind(func, obj) {
  return function(...args) {
      return func.apply(obj, args);
  };
}

let numbers = {
    a: 1,
    b: 2,
    add() {
      return this.a + this.b;
    },
};

let words = {
    a: 'hi ',
    b: 'there',
};

console.log(myBind(numbers.add, words));

/// my solution without apply -- call

let numbers = {
    a: 1,
    b: 2,
  };
  
  let letters = {
    a: 'a',
    b: 'b',
  };
  
  function addOrConcat() {
    return this.a + this.b;
  }
  
  function myBind(func, context) {
    return function() {
      return func.call(context);
    }
  }
  
  let add = myBind(addOrConcat, numbers);
  let concat = myBind(addOrConcat, letters);
  console.log(add());    // 3
  console.log(concat()); // ab

  /// with apply, this uses closures to return a bound function that has access to the context object supplied and the args array, if the function has any arguments ****************

  let numbers = {
    a: 1,
    b: 2,
  };
  
  let letters = {
    a: 'a',
    b: 'b',
  };
  
  function addOrConcat() {
    return this.a + this.b;
  }
  
  function myBind(func, context) {
    return function(...args) {
      return func.apply(context, args);
    }
  }
  
  let add = myBind(addOrConcat, numbers);
  let concat = myBind(addOrConcat, letters);
  console.log(add());    // 3
  console.log(concat()); // ab
  