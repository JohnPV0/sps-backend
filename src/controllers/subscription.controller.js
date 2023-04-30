import { subscriptionService } from "../service/subscription.service.js";

export const createSubscription = async (req, res) => {
    const { id_user, id_payment } = req.body;
    console.log("id_user: " + id_user)
    console.log("id_payment: " + id_payment)
    try {
        const [rows] = await subscriptionService.insertSuscription(id_user, id_payment);

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Usuario no encontrado para generar la suscripción'
            });
        
        return res.json({
            "id": rows.insertId
        });
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const selectLastSubscriptionByUser = async (req, res) => {
    const { id_user } = req.body;
    try {
        const [s] = await subscriptionService.selectLastSuscriptionByUser(id_user);

        if (s.length <= 0)
            return res.status(404).json({
                message: 'Usuario no encontrado para generar la suscripción'
            });
        const fechaBD = new Date(s[0].end_date);
        const fechaActual = new Date();
        console.log("FechaBD:" + fechaBD)
        console.log("FechaActual" + fechaActual)

        if (fechaBD < fechaActual) {
            const [rows] = await subscriptionService.updateSuscription(s[0].id);
            if (rows.length < 0)
                return res.status(404).json({
                    message: 'Usuario no encontrado para actualizar la suscripción'
                });
        }
        return res.json(s[0]);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export const getAllSubscriptionsByUser = async (req, res) => {
    const id_user = req.params.id;
    try {
        const [rows] = await subscriptionService.getAllSuscriptionsByUser(id_user);
        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Usuario no tiene suscripciones'
            });
        return res.json(rows);
    } catch (error) {
        res.status(500).send(error.message)
    }
}
