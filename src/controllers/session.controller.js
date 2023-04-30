import { sessionService } from "../service/session.service.js";
import { generateCookie } from "../utils/cookie.js";

export const createSession = async (req, res) => {
    const { userId } = req.body;
    console.log(userId)
    const cookie = generateCookie();
    try {
        const [s] = await sessionService.getLastSessionByUser(userId);
        console.log(s[0])
        console.log(s.length)
        if (s.length > 0) {
            if (s[0].active === 1)
                return res.status(409).json({
                    message: 'El usuario ya tiene una sesión activa, debe cerrarla para generar una nueva'
                });
        }
        console.log(s[0])
        const [rows] = await sessionService.createSession(userId, cookie);
        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Usuario no encontrado para generar la cookie'
            });
        console.log(rows)
        const [se] = await sessionService.selectSession(rows.insertId);
        console.log(se[0])
        res.json(se[0]);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }

}

export const selectSession = async (req, res) => {
    const { sessionId } = req.query;
    try {
        const [rows] = await sessionService.selectSession(sessionId);
        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Sesión expirada o no generada'
            });

        if (rows[0].active !== 1)
            return res.status(404).json({
                message: "Session expirada"
            });

        res.json(rows[0]);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}

export const finishSession = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const [rows] = await sessionService.finishSession(sessionId);
        if (rows.length <= 0)
            return res.status(404).json({
                message: 'Sesion no encontrada'
            });
        res.sendStatus(204);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }
}