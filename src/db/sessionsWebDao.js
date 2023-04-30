import { pool } from './connection.js';

export const sessionsWebDao = {
    insertSessionWeb(userId, cookie) {
        return pool.query("INSERT INTO sessions_web (id_user, cookie) VALUES (?, ?);", [userId, cookie]);
    }
}