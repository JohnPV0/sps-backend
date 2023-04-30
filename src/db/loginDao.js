import { pool } from './connection.js';

export const loginDao = {

    selectLogin(username) {
        return pool.query("SELECT * FROM personal_tokens WHERE username = ?", [username]);
    }
}