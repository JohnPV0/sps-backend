import { verificationsDao } from "../db/verificationsDao.js";

export const confirmationService = {
    createCode(userId, code) {
        return verificationsDao.insertVerification(userId, code);
    },
    getCode(userId) {
        return verificationsDao.getVerification(userId);
    }
}