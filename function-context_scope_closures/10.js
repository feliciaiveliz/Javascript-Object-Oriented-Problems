// In an earlier exercise, we created a school object. It works, however, it can still be improved. The following are improvements for you to implement in the solution provided:

// Make the list students private. Right now, anyone can gain access to it and manipulate it.
// Make the constraint for allowed values for years a private variable. As a private variable it avoids an unnecessary statement in the addStudent method and at the same time makes the code more declarative.
// Make the getCourse function accessible in the addGrade method also. As it is, only the courseReport method has access.
// If you need a refresher on creating private data and scope, you may find the following lessons helpful:

// Creating a Private Scope with an IIFE
// Creating Private Data with an IIFE


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

let school = (function() {
  let students = [];
  let allowedYears = ['1st', '2nd', '3rd', '4th', '5th'];

  function getCourse(student, courseName) {
    return student.listCourses().filter(({name}) => name === courseName)[0];
  }

  return {
    addStudent(name, year) {
      if ((allowedYears).includes(year)) {
        let student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid year');
      }
    },
  
    enrollStudent(student, courseName, courseCode) {
      student.addCourse({ name: courseName, code: courseCode });
    },
  
    addGrade(student, courseName, grade) {
      let course = getCourse(student, courseName);
  
      if (course) {
        course.grade = grade;
      }
    },
  
    getReportCard(student) {
      student.listCourses().forEach(({ grade, name}) => {
        if (grade) {
          console.log(`${name}: ${String(grade)}`);
        } else {
          console.log(`${name}: In progress`);
        }
      });
    },
  
    courseReport(courseName) {
      const courseStudents = students.map(student => {
        const course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(({grade}) => grade);
  
      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);
  
        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;
  
        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  }
  
})();