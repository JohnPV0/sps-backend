import { pool } from './connection.js';

export const paymentDao = { 
    insertPayment(id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency, id_user) {
        return pool.query("INSERT INTO payments (id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency, id_user]);
    }
}