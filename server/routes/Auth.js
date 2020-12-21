import express from 'express';
import bodyParser from 'body-parser';

import { status, signup, login, google } from '../controllers/Auth.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/status', status);

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', google);

export default router;
