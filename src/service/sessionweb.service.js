import { sessionsWebDao } from "../db/sessionsWebDao.js";

export const sessionWebService = { 
    createSessionWeb(userId, cookie) {
        return sessionsWebDao.insertSessionWeb(userId, cookie);
    }
}