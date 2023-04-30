import crypto from 'crypto-js';

function generateSal() {
    return Math.random().toString(16);
}

function hashPassword(password, salt) {
  return crypto.SHA256(salt + password).toString();
}

var salt = generateSal();
var pass = "v4l3nc143333;"
var pass2 = "admin1234"
var passHashed = hashPassword(pass2, salt);
console.log(passHashed + " " + salt);