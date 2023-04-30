import express from 'express';

import usersRoutes from './routes/user.routes.js';
import sessionRoutes from './routes/session.routes.js';
import confirmationRoutes from './routes/confirmation.routes.js'
import sessionWebRoutes from './routes/sessionweb.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'

import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import { verifyLogin } from './controllers/login.controller.js';
import { JWTTOKEN } from './config.js';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.post('/login', verifyLogin);

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No se proporcionó un token de acceso' });
    }
  
    jwt.verify(token, JWTTOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'El token de acceso no es válido' });
      }
      req.user = user;
      next();
    });
  };

//Todas las rutas
app.use('/api', verifyToken, usersRoutes);
app.use('/api', verifyToken, sessionRoutes);
app.use('/api', verifyToken, confirmationRoutes);
app.use('/api', verifyToken, sessionWebRoutes);
app.use('/api', verifyToken, paymentRoutes);
app.use('/api', verifyToken, subscriptionRoutes);

app.use((req, res, next) => {
    res.status(500).json({
        message: "Page not found"
    });
});

export default app;