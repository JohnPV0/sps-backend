import { paymentDao } from "../db/paymentDao.js";

export const paymentService = { 
    insertPayment(id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency,id_user) {
        return paymentDao.insertPayment(id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency, id_user);
    }
}
