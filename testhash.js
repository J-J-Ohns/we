const bcrypt = require('bcrypt')
const saltRounds = 10;
const myPlainTextPassword = 'myTopSecretPassword'
//const someOtherPlaintextPassword = 'not_bacon'
 
//Technique 1
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlainTextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
    });
});
 
//Technique 2
//const hash = bcrypt.hash(myPlainTextPassword, saltRounds, function(err, hash) { console.log(hash) })
//console.log(hash) // '$2b$10$wv3Q7Q7Z6Q7Q7Z6Q7Q7Z6Q7Q7Z6Q7Z6Q7Q7Z6Q7