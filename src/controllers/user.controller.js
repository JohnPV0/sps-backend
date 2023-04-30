import { userService } from "../service/user.service.js";
import { confirmationService } from "../service/confirmation.service.js";
import { generateSal, hashPassword, verifyPassword } from "../utils/password.util.js";

export const verifyUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const [rows] = await userService.verifyUser(email);
        if (rows.length <= 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });

        if (verifyPassword(password, rows[0].salt, rows[0].password) === false ) 
            return res.status(404).json({
                message: 'Usuario no encontrado, si ya se registró y no ha verificado su correo, por favor verifique su bandeja de entrada o spam, o verifique sus datos y vuelva a intentarlo'
            });
        
        const [u] = await userService.getDataUser(email);
        if (u[0].verified === 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado, si ya se registró y no ha verificado su correo, por favor verifique su bandeja de entrada o spam, o verifique sus datos y vuelva a intentarlo'
            });
        res.json(u[0]);
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }  
};

export const getDataUser = async (req, res) => {
    const {id_user} = req.body;
    try {
        const [rows] = await userService.selectUser(id_user);
        if (rows.length <= 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.json(rows[0]);
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }  
};

export const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const salt = generateSal();
        const passEncrypt = hashPassword(password, salt);
        await userService.addUser(name, email, passEncrypt, salt);
        const [rows] = await userService.getDataUser(email);

        if (rows.length <= 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });

        res.json(rows[0]);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json( {
                    message: 'El correo eléctrónico proporcionado ya existe en el servidor'
                }
            )
        } else {
            return res.status(500).send(error.message)
        }
        
    }

};

export const existEmail = async (req, res) => {
    const {email} = req.body
    try {
        const [rows] = await userService.existEmail(email)
        if (rows.length <= 0) 
            return res.status(200).json({
                message: 'Se puede insertar en la bd'
        });
        res.status(409).json({
            message: 'El correo eléctrónico proporcionado ya existe'
        });
    } catch (error){
        return res.status(500).send(error.message)
    }
};

export const confirmAccount = async (req, res) => {
    const {email, code } = req.body
    try {
        const [u] = await userService.getDataUser(email)
        
        if (u.length <= 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });



        const [c] = await confirmationService.getCode(u[0].id)

            if (c.length <= 0) 
                return res.status(404).json({
                    message: 'No se ha registrado el código de verificación'
                });
            if (c[0].code != code)
                return res.status(404).json({
                    message: 'Código de verificación incorrecto'
                })

        if (u[0].verified == 1) {
            return res.status(409).json({
                message: 'Usuario ya ha sido verificado'
            });
        }

        
        
        const [rows] = await userService.confirmAccount(email)
        if (rows.affectedRows <= 0) 
            return res.status(404).json({
                message: 'Usuario no encontrado'
        });
        
        console.log(rows)
        res.sendStatus(200);
    } catch (error){
        return res.status(500).send(error.message)
    }
};

export const updateUser = async (req, res) => {
    const {id_user, password} = req.body;
    try {
        const salt = generateSal();
        const passEncrypt = hashPassword(password, salt);
        const [rows] = await userService.updateUser(id_user, passEncrypt, salt)
        if (rows.affectedRows <= 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.json({
            message: 'Usuario actualizado'
        });
    } catch(error) {
        return res.status(500).send(error.message)
    }
}


