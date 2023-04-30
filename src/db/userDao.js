import { pool } from './connection.js';

export const userDao = {
    insertUser(name, email, password, salt) {
        return pool.query("INSERT INTO users VALUES (0, ?, ?, ?, ?, 0)", [name, email, password, salt]);
    },
    selectDataUser(email) {
        return pool.query("SELECT id, name, email, verified FROM users u " +  
            "WHERE BINARY email = ?", [email]);
    },
    selectUserForVerify(email) {
        return pool.query("SELECT password, salt FROM users u " + 
            "WHERE BINARY email = ?", [email]);
    },
    existEmail(email) {
        return pool.query('SELECT email FROM users u WHERE BINARY email = ?', [email])
    },
    confirmAccount(email) {
        return pool.query('UPDATE users SET verified = 1 WHERE BINARY email = ?', [email])
    },
    selectUser(id_user) {
        return pool.query('SELECT id, name, email, verified FROM users u WHERE id = ?', [id_user]);
    },
    updateUser(id_user, password, salt) {
        return pool.query('UPDATE users SET password = ?, salt = ? WHERE id = ?', [password, salt, id_user]);
    }
};