import express from 'express';
import bodyParser from 'body-parser';

import {
  status,
  signup,
  login,
  google,
  googleCB,
} from '../controllers/Auth.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/status', status);

router.post('/signup', signup);
router.post('/login', login);
router.get('/google', google);
router.get('/googleCB', googleCB);

export default router;
