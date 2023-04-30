import { pool } from './connection.js';

export const sessionDao = {
    insertCookie(userId, cookie) {
        return pool.query("INSERT INTO sessions_app (id_user, cookie) VALUES (?, ?);", [userId, cookie]);
    },

    selectSession(sessionId) {
        return pool.query("SELECT id, id_user, cookie, active FROM sessions_app s WHERE id = ?", [sessionId]);
    },

    updateSessionFinish(sessionId) {
        return pool.query("UPDATE sessions_app SET active = 0 WHERE id = ?", [sessionId]);
    },
    selectLastSessionByUser(id_user) {
        return pool.query("SELECT * FROM sessions_app as s WHERE id_user = ? ORDER BY id DESC LIMIT 1;", [id_user]);
    }
}