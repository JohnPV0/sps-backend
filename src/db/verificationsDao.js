import { pool } from './connection.js';

export const verificationsDao = {
    insertVerification(userId, code) {
        return pool.query("INSERT INTO confirmation_codes VALUES (0, ?, ?)", [userId, code]);
    },
    getVerification(userId) {
        return pool.query("SELECT * FROM confirmation_codes WHERE id_user = ?", [userId]);
    }
};