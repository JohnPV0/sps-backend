import { loginDao } from "../db/loginDao.js";

export const loginService = {

    selectLogin(username) {
        return loginDao.selectLogin(username);
    }
}