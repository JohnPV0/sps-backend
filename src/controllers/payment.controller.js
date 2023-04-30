import { paymentService } from "../service/payment.service.js";

export const createPayment = async (req, res) => {
    const { id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency, id_user } = req.body;
    try {
        const [rows] = await paymentService.insertPayment(id_payment_method, payer_id, payer_email, payment_id, amount, payment_status, currency, id_user);
        if (rows.length <= 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado para generar la venta'
            });
        res.json({
            "id": rows.insertId
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

