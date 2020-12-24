import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import {
  status,
  signup,
  login,
  googleCB,
  logout,
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

router.get('/logout', logout);

export default router;
