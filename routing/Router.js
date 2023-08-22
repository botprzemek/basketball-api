import express from 'express';
import players from './route/Players.js';

const router = express.Router();

router.use((req, res, next) => {
    if ((!req.headers['secret']) || req.headers['secret'] !== process.env.SECRET) return res.sendStatus(401);
    next();
})

router.use('/players', players);

export default router;