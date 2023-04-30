import { userDao } from "../db/userDao.js";

export const userService = {
    addUser(name, email, password, salt) {
        return userDao.insertUser(name, email, password, salt);
    },
    verifyUser(email) {
        return userDao.selectUserForVerify(email)
    },
    getDataUser(email) {
        return userDao.selectDataUser(email);
    },
    getSalt(email) {
        return userDao.selectSalt(email);
    },
    existEmail(email) {
        return userDao.existEmail(email);
    },
    confirmAccount(email) {
        return userDao.confirmAccount(email)
    },
    selectUser(id_user) {
        return userDao.selectUser(id_user);
    },
    updateUser(id_user, password, salt) {
        return userDao.updateUser(id_user, password, salt);
    }
}
