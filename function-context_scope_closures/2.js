// The method franchise.allMovies is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

// Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.

// ls code
// const franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies() {
//     return [1, 2, 3].map(function(number) {
//       return `${this.name} ${number}`;
//     });
//   },
// };

// console.log(franchise.allMovies());

// currently, the values of the movie names are undefined
// i think it's because `this` is being used within an anonymous function used by map
// to make `this` refer to 'franchise', set 'this' to 'self' within 'allMovies'

const franchise = {
    name: 'How to Train Your Dragon',
    allMovies() {
      let self = this;
      return [1, 2, 3].map(function(number) {
        return `${self.name} ${number}`;
      });
    }
  };
  
  console.log(franchise.allMovies());