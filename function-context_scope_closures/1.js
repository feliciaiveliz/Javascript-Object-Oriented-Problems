// Read the following code carefully. What do you think is logged on line 7. Try to answer the question before you run the code.

const person = {
    firstName: "Rick",
    lastName: "Sanchez",
    fullName: this.firstName + this.lastName,
};

console.log(person.fullName); // NaN

// this used outside of a function refers to the global object
// within a function, this refers to the calling object, or the global object depending on how its used
// fullName is supposed to work like a function but it is not
// change fullName and define it as a function, so that this refers to person

const person = {
    firstName: "Rick",
    lastName: "Sanchez",
    firstName() { this.firstName + this.lastName },
};

