// Implement an ancestors method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:

/*
input: 
- calling object
output:
- return an array of object names
algorithm:
- set 'result' to []
- loop while the prototype of current object is !'null'
  - get prototype of current object
    - push to 'result'
- return result
*/

Object.prototype.ancestors = function() {
  let result = [];
  let ancestor = Object.getPrototypeOf(this);

  while (ancestor) {
    result.push(ancestor.name || 'Object.prototype');
    ancestor = Object.getPrototypeOf(ancestor);
  }

  return result;
}

const foo = { name: 'foo' }; // foo = { name: 'foo' }
const bar = Object.create(foo); // foo becomes prototype of bar
bar.name = 'bar'; // create prop on bar object called name => bar = { name: 'bar '}
const baz = Object.create(bar); // bar becomes prototype of baz
baz.name = 'baz'; // create prop on baz object called name => baz = { name: 'baz' }
const qux = Object.create(baz); // baz becomes prototype of qux
qux.name = 'qux'; // create prop on qux object called name => qux = { name: 'qux' }

console.log(qux.ancestors()); // ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors()); // ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors()); // ['foo', 'Object.prototype']
console.log(foo.ancestors()); // ['Object.prototype']