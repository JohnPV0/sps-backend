import { subscriptionDao } from "../db/subscriptionDao.js";

export const subscriptionService = {
    insertSuscription(id_user, id_payment) {
        return subscriptionDao.insertSuscription(id_user, id_payment);
    },
    selectLastSuscriptionByUser(id_user) {
        return subscriptionDao.getLastSuscriptionByUser(id_user);
    },
    updateSuscription(id_suscription) {
        return subscriptionDao.updateSuscription(id_suscription);
    },
    getAllSuscriptionsByUser(id_user) {
        return subscriptionDao.getAllSubscriptionsByUser(id_user);
    }
}