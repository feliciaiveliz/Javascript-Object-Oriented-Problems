// Read the following code carefully. Will the JavaScript garbage collection mechanism garbage collect the array assigned to the variable array after the function pushIt is run on line 10?

function makeArrays() {
    let array = [];

    return () => {
      array.push('');
      return array;
    };
}

const pushIt = makeArrays();
pushIt();

// No it can't be. The array object saved to 'array' is never reassigned; it's only ever mutated.
// On each iteration, every call to `pushIt` returns a pointer to the same exact array object in memory.
// This means that the existance of the array object must persist for the life of the 'pushIt' function
// A closure is created by the returned function in the makeArrays function and this closure has access to the array referenced by 'array'.