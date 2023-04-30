import { confirmationService } from '../service/confirmation.service.js'

export const createCode = async (req, res) => {
    const {userId, code} = req.body;
    try {
        await confirmationService.createCode(userId, code);
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        if (error.code == 'ER_NO_REFERENCED_ROW_2') {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        return res.status(500).json({
            message: "Error inesperado"
        });
    }
}