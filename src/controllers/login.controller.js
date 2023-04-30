import { loginService } from "../service/login.service.js";
import { JWTTOKEN } from "../config.js";
import { verifyPassword } from "../utils/password.util.js";
import jwt from 'jsonwebtoken';

export const verifyLogin = async (req, res) => {
    const {username, password} = req.body;
    try {
        const [rows] = await loginService.selectLogin(username);
        if (rows.length <= 0) 
            return res.status(404).json({
                message: 'Not found'
            });

        if (verifyPassword(password, rows[0].salt, rows[0].password) === false) 
            return res.status(404).json({
                message: 'Not found'
            });
        
        const user = { id: rows[0].id, username: rows[0].username };
        const accessToken = jwt.sign(user, JWTTOKEN);
        res.json({ accessToken });
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message)
    }  
};