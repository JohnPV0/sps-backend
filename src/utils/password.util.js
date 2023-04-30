import crypto from 'crypto-js';

export function generateSal() {
    return Math.random().toString(16);
}

export function hashPassword(password, salt) {
  return crypto.SHA256(salt + password).toString();
}


export function verifyPassword(password, salt, hash) {
  let saltedPassword = salt + password;
  let hashedPassword = crypto.SHA256(saltedPassword).toString();
  return hashedPassword === hash;
}



