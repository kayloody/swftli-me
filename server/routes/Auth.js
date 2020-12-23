import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

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
router.post('/login', passport.authenticate('local'), login);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/googleCB', passport.authenticate('google'), googleCB);

export default router;
