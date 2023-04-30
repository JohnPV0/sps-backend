import { sessionDao } from "../db/sessionDao.js";

export const sessionService = {
    createSession(userId, cookie) {
        return sessionDao.insertCookie(userId, cookie);
    },
    selectSession(sessionId) {
        return sessionDao.selectSession(sessionId);
    },
    finishSession(sessionId) {
        return sessionDao.updateSessionFinish(sessionId);
    },
    getLastSessionByUser(id_user) {
        return sessionDao.selectLastSessionByUser(id_user);
    }
}