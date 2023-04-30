import { sessionWebService } from "../service/sessionweb.service.js";

export const createSessionWeb = async (req, res) => { 
    const {userId, cookie} = req.body;
    try {
        const [rows] = await sessionWebService.createSessionWeb(userId, cookie);

        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Usuario no encontrado para generar la cookie'
            });
        return res.json(rows[0]);
    } catch (error) {
        return res.status(500).send(error.message)
    }
}