import express from 'express';
import bodyParser from 'body-parser';

import { signup, login } from '../controllers/Auth.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/signup', signup);
router.post('/login', login);

export default router;
