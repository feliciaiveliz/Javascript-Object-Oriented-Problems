// Create a school object. The school object uses the student object from the previous exercise. It has methods that use and update information about the student. Be sure to check out the previous exercise for the other arguments that might be needed by the school object. Implement the following methods for the school object:

// addStudent: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
// enrollStudent: Enrolls a student in a course.
// addGrade: Adds the grade of a student for a course.
// getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
// courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.
// To test your code, use the three student objects listed below. Using the three student objects, produce the following values from the getReportCard and courseReport methods respectively.

function createStudent(name, year) {
  return {
    name, 
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code && !course.note) {
          course.note = note;
        } else if (course.code === code && course.note) {
          course.note += '; ' + note;
        }
      });
    },

    updateNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course.note = note;
        }
      });
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    }
  }
}

let school = {
  students: [],
  
  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      let newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(name, course) {
    // into students courses array, push a new course object
    let student = this.students.filter(student => student.name === name)[0];
    student.courses.push(course);
  },

  addGrade(name, code, grade) {
    // into students courses array, find course with either name or code
    let student = this.students.filter(student => student.name === name)[0];
    let course = student.courses.filter(course => course.code === code)[0];
    course.grade = grade;
  },

  getReportCard(student) {
    // logs grade of student, if no grade -- in progress
    console.log(`---${student.name}'s Report Card---`);
    console.log('');
    student.courses.forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },
  
  courseReport(courseName) {
    // check each student's courses array to match course
    let report = [];
    this.students.forEach(student => { // student object
      let gradedCourse = student.courses.filter(course => course.name === courseName && course.grade)[0];
      report.push([student.name, gradedCourse.grade]);
    });
    if (report.length > 0) {
      let total = 0;
      console.log(`==${courseName} Grades==`);
      report.forEach(grade => {
        total += grade[1];
        console.log(`${grade[0]}: ${grade[1]}`);
      });
      console.log('---');
      console.log(`Course Average: ${total / report.length}`);
    } else {
      return undefined;
    }
  },
}

school.addStudent('Felicia', '3rd');
school.addStudent('Vinton', '1st');
school.enrollStudent('Felicia', { name: 'Math', code: 101 });
school.enrollStudent('Vinton', { name: 'Networking', code: 102 });
school.enrollStudent('Vinton', { name: 'Ruby', code: 102, grade: 94 });
school.enrollStudent('Felicia', { name: 'Ruby', code: 102, grade: 100 });
school.enrollStudent('Felicia', { name: 'Javascript', code: 225 });
// let felicia = school.students[0];
// let vinton = school.students[1];
// console.log(school.students);
// console.log(vinton);
school.addGrade('Felicia', 101, 98);
school.addGrade('Vinton', 102, 100);
// console.log(felicia);
// console.log(vinton);
// school.getReportCard(felicia);
console.log(school.courseReport('Ruby'));