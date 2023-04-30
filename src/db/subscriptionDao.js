import { pool } from './connection.js';

export const subscriptionDao = {
    insertSuscription(id_user, id_payment) {
        return pool.query("INSERT INTO subscriptions (id_user, id_payment) VALUES (?, ?);", [id_user, id_payment]);
    },
    getLastSuscriptionByUser(id_user) {
        return pool.query("SELECT * FROM subscriptions as s WHERE id_user = ? ORDER BY id DESC LIMIT 1;", [id_user]);
    },
    updateSuscription(id_subscription) {
        return pool.query("UPDATE subscriptions SET active = 0 WHERE id = ?;", [id_subscription]);
    },
    getAllSubscriptionsByUser(id_user) {
        return pool.query("SELECT s.id as id, start_date, end_date, amount, currency, active, pm.name as payment_method FROM subscriptions s JOIN payments p ON s.id_payment = p.id JOIN payment_methods pm ON p.id_payment_method = pm.id WHERE s.id_user = ? ORDER BY s.id DESC;", [id_user]);
    }
}