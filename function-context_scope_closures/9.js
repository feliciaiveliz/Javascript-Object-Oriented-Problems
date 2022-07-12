const greeter = (function(name, greeting) {
  return function() {
    console.log(`${greeting} ${name}!`);
  }
})('Naveed', 'Hello');

console.log(greeter());

// const greeter = (function(name, greeting) {
//     return {
//         message: `${greeting} ${name}!`,
//         sayGreetings() {
//             console.log(this.message);
//         }
//     }
// })('Naveed', 'Hello');

// greeter.sayGreetings();