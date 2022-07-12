function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  console.log(`${this.firstName} ${this.lastName}`);
}

Person.prototype.communicate = function() {
  console.log('Communicating');
}

Person.prototype.eat = function() {
  console.log('Eating');
}

Person.prototype.sleep = function() {
  console.log('Sleeping');
}

const person = new Person('Felicia', 'Bacon', 28, 'female');
console.log(person instanceof Person); // true
console.log(person.eat());             // Eating
console.log(person.communicate());     // Communicating
console.log(person.sleep());           // Sleeping
console.log(person.fullName());        // Felicia Bacon

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function() {
  console.log('Diagnosing');
}

const doctor = new Doctor('Camille', 'Solak', 25, 'female', 'Oncology');
console.log(doctor instanceof Person); // true
console.log(doctor instanceof Doctor); // true
console.log(doctor.eat());             // Eating
console.log(doctor.communicate());     // Communicating
console.log(doctor.sleep());           // Sleeping
console.log(doctor.fullName());        // Camille Solak
console.log(doctor.diagnose());        // Diagnosing

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log('Studying');
}

const student = new Student('Kayla', 'Khan', 23, 'female', 'Psychology');
console.log(student instanceof Person);  // true
console.log(student instanceof Student); // true
console.log(student.eat());             // Eating
console.log(student.communicate());     // Communicating
console.log(student.sleep());           // Sleeping
console.log(student.fullName());        // Kayla Khan
console.log(student.study());           // Studying

function GraduateStudent(firstName, lastName, age, gender, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function() {
  console.log('Researching');
}

const graduateStudent = new GraduateStudent('Felicia', 'Khan', 28, 'female', 'Software Engineering');
console.log(graduateStudent instanceof Person);  // true
console.log(graduateStudent instanceof Student); // true
console.log(graduateStudent instanceof GraduateStudent); // true
console.log(graduateStudent.eat());             // Eating
console.log(graduateStudent.communicate());     // Communicating
console.log(graduateStudent.sleep());           // Sleeping
console.log(graduateStudent.fullName());        // Felicia Khan
console.log(graduateStudent.study());           // Studying
console.log(graduateStudent.research());        // Researching

// class syntax

class Person {
  constructor(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  eat() {
    return 'Eating';
  }

  sleep() {
    return 'Sleeping';
  }

  communicate() {
    return 'Communicating';
  }
}

class Doctor extends Person {
  constructor(firstName, lastName, age, gender, specialization) {
    super(firstName, lastName, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    return 'Diagnosing';
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, gender, degree) {
    super(firstName, lastName, age, gender);
    this.degree = degree;
  }

  study() {
    return 'Studying';
  }
}

class GraduateStudent extends Student {
  constructor(firstName, lastName, age, gender, graduateDegree) {
    super(firstName, lastName, age, gender);
    this.graduateDegree = graduateDegree;
  }

  research() {
    return 'Researching';
  }
}

let person = new Person('Felicia', 'Bacon', 28, 'female');
console.log(person instanceof Person); // true
console.log(person.eat());             // Eating
console.log(person.communicate());     // Communicating
console.log(person.sleep());           // Sleeping
console.log(person.fullName());        // Felicia Bacon

let doctor = new Doctor('Camille', 'Solak', 25, 'female', 'Oncology');
console.log(doctor instanceof Person); // true
console.log(doctor instanceof Doctor); // true
console.log(doctor.eat());             // Eating
console.log(doctor.communicate());     // Communicating
console.log(doctor.sleep());           // Sleeping
console.log(doctor.fullName());        // Camille Solak
console.log(doctor.diagnose());        // Diagnosing

let student = new Student('Kayla', 'Khan', 23, 'female', 'Psychology');
console.log(student instanceof Person);  // true
console.log(student instanceof Student); // true
console.log(student.eat());             // Eating
console.log(student.communicate());     // Communicating
console.log(student.sleep());           // Sleeping
console.log(student.fullName());        // Kayla Khan
console.log(student.study());           // Studying

let graduateStudent = new GraduateStudent('Felicia', 'Khan', 28, 'female', 'Software Engineering');
console.log(graduateStudent instanceof Person);  // true
console.log(graduateStudent instanceof Student); // true
console.log(graduateStudent instanceof GraduateStudent); // true
console.log(graduateStudent.eat());             // Eating
console.log(graduateStudent.communicate());     // Communicating
console.log(graduateStudent.sleep());           // Sleeping
console.log(graduateStudent.fullName());        // Felicia Khan
console.log(graduateStudent.study());           // Studying
console.log(graduateStudent.research());        // Researching


