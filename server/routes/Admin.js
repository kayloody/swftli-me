import express from 'express';
import bodyParser from 'body-parser';

import {
  oauthuser,
  loadSettings,
  saveSettings,
  deleteAccount,
} from '../controllers/Admin.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/oauthuser', oauthuser);

router.get('/loadSettings', loadSettings);
router.post('/saveSettings', saveSettings);
router.get('/delete', deleteAccount);

export default router;
