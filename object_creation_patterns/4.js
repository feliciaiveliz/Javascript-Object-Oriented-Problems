// Using OLOO create an Account prototype object that anonymizes user objects on init. The created object should not have access to the function that anonymizes a user other than through the init and reanonymize methods. The function that anonymizes creates a 16 character sequence composed of letters and numbers. The following are the properties and methods on the Account object:

// init: The init method sets the email, password, firstName, lastName, and displayName of user. The displayName is a 16 character sequence generated for the user. It's used as the display name of a user.
// reanonymize: This method generates a new 16 character sequence and reassigns it to the displayName property if the password provided is valid. Returns true if successfully re-anonymized. Returns 'Invalid Password' if the password provided is not valid.
// resetPassword: This method asks the user for a new password and reassigns it to the password property. To reset the password, the user must provide the current password. Returns 'Invalid Password' if the password provided is not valid. Returns true if the password is successfully reset.
// firstName: This method returns the first name of the user if the password provided is valid. Returns 'Invalid Password' if the password provided is not valid.
// lastName: This method returns the last name of the user if the password provided is valid. Returns 'Invalid Password' if the password provided is not valid.
// email: This method returns the email name of the user if the password provided is valid. Returns 'Invalid Password' if the password provided is not valid.
// displayName: This property returns the displayName — the 16 character sequence.
// Other than the above properties, methods, and properties inherited from Object.prototype, no other method or property should exist on the object returned by the Account prototype object.

let Account = (function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;
  const errorMessage = 'Invalid Password';

  function validPassword(password) {
    return userPassword === password;
  }

  function anonymize() {
    let sequence = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i += 1) {
      sequence += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return sequence;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = anonymize();
      return this;
    },

    reanonymize(password) {
      if (validPassword(password)) {
        this.displayName = anonymize();
        return true;
      } else {
        return errorMessage;
      }
    },
    
    resetPassword(currentPassword, newPassword) {
      if (validPassword(currentPassword)) {
        userPassword = newPassword;
        return true;
      } else {
        return errorMessage;
      }
    },

    firstName(password) {
      if (validPassword(password)) {
        return userFirstName;
      } else {
        return errorMessage;
      }
    },

    lastName(password) {
      if (validPassword(password)) {
        return userLastName;
      } else {
        return errorMessage;
      } 
    },

    email(password) {
      if (validPassword(password)) {
        return userEmail;
      } else {
        return errorMessage;
      }
    },
  }
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password';
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // 
// returns true
console.log(displayName);
console.log(displayName === fooBar.displayName);   // logs false

let feliciabacon = Object.create(Account).init('felicia@bacon.com', 'meow', 'Felicia', 'Bacon');
console.log(feliciabacon.firstName);
console.log(feliciabacon.email);
console.log(feliciabacon.firstName('meow')); // Felicia
console.log(feliciabacon.firstName('abc123')); // Invalid password
console.log(feliciabacon.displayName);
console.log(feliciabacon.resetPassword('Meow', 'woof')); // Invalid password
console.log(feliciabacon.resetPassword('meow', 'woof')); // true

let displayName = feliciabacon.displayName;
feliciabacon.reanonymize('woof'); // true
console.log(displayName === feliciabacon.displayName); // false

// fe

let Account = (function() {
  let accounts = {};

  let nextId = (function() {
    let id = 0;

    return function() {
      id += 1;
      return id;
    };
  })();

  function retrieveAccount(id) {
    return accounts[String(id)];
  }

  function validPassword(id, testPassword) {
    return retrieveAccount(id).password === testPassword;
  }

  function invalidCredentials(account, password) {
    return !account || !validPassword(id, password);
  }

  function errorMessage() {
    return 'Invalid password';
  }
  
  function anonymize() {
    let sequence = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i += 1) {
      sequence += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return sequence;
  }

  return {
    init(email, password, firstName, lastName) {
      this.id = nextId();
      let newAccount = {
        email,
        password,
        firstName,
        lastName,
        displayName: anonymize(),
      };

      accounts[this.id] = newAccount;
      return this;
    },

    checkAccountValidity(account, password) {
      if (invalidCredentials(account.id, password)) {
        return errorMessage;
      }
    },
    
    reanonymize(testPassword) {
      let account = retrieveAccount(this.id);
      checkAccountValidity(account);
      account.displayName = anonymize();
      return true;
    },

    resetPassword(password, newPassword) {
      let account = retrieveAccount(this.id);
      checkAccountValidity(account);
      account.password = newPassword;
      return true;
    },

    email(password) {
      let account = retrieveAccount(this.id);
      checkAccountValidity(account);
      return account.email;
    },

    firstName(password) {
      let account = retrieveAccount(this.id);
      checkAccountValidity(account);
      return account.firstName;
    },

    lastName(password) {
      let account = retrieveAccount(this.id);
      checkAccountValidity(account);
      return account.lastName;
    },

    displayName() {
      let account = retrieveAccount(this.id);
      return account.displayName;
    },
  };
})();

// fe attempt 2

// create an object that holds multiple objects
// 
let Account = (function() {
  let accounts = {};
  const INVALID_PASSWORD = 'Invalid Password';

  function validPassword(testPassword, account) {
    return (testPassword === account.password);
  }

  function anonymize() {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0 ; i <= 16; i += 1) {
      let index = Math.floor(Math.random() * characters.length);
      result += characters[index];
    }

    return result;
  }

  return {
    init(email, password, firstName, lastName) {

      let newAccount = {
        email,
        password,
        firstName,
        lastName,
      };
      
      this.displayName = anonymize();
      accounts[this.displayName] = newAccount;
      return this;
    },

    reanonymize(password) {  
      let account = accounts[this.displayName]; 

      if (validPassword(password, account)) {
        let oldDisplayName = this.displayName; 
        this.displayName = anonymize(); 
        accounts[this.displayName] = account;
        delete accounts[oldDisplayName];
        return true;
      } else {
        return INVALID_PASSWORD;
      }
    },

    resetPassword(currentPassword, newPassword) {
      let account = accounts[this.displayName];

      if (validPassword(currentPassword, account)) {
        account.password = newPassword;
        return true;
      } else {
        return INVALID_PASSWORD;
      }
    },

    firstName(password) {
      let account = accounts[this.displayName];
      return (validPassword(password, account) ? account.firstName : INVALID_PASSWORD);
    },

    lastName(password) {
      let account = accounts[this.displayName];
      return (validPassword(password, account) ? account.lastName : INVALID_PASSWORD);
    },

    email(password) {
      let account = accounts[this.displayName];
      return (validPassword(password, account) ? account.email : INVALID_PASSWORD);
    },

    displayAccounts() {
      console.log(accounts);
    }
  }
})();

let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email('123456'));                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true
console.log(fooBar.displayAccounts());

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log('**');
console.log(displayName);
console.log(fooBar.displayName);
console.log(displayName === fooBar.displayName);   // logs false
console.log(fooBar.displayAccounts()); 

let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(bazQux.displayAccounts());
console.log(fooBar.firstName('abc'));    // foo
console.log(bazQux.firstName('123456')); // baz
console.log(fooBar.email('abc'));     // 'foo@bar.com'