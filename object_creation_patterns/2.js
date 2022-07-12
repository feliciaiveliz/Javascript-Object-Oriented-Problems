// Write a delegate function that can be used to delegate the behavior of a method or function to another object's method. delegate takes a minimum of two arguments: (1) the object and (2) name of the method on the object. The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to.

/*
input: 
- object
- name of method
- additional arguments
output:
- return value of the method call on the passed in object
algorithm:
- return:
  - call the second argument (method name) on the first argument (object)
  - pass the third argument to the second argument 
*/

function delegate(object, methodName, ...args) {
  return function() {
    let method = object[methodName];
    method.apply(object, args);
  }
}

const foo = {
  name: "test",
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();

foo.bar = () => { console.log('changed'); };

baz.qux();