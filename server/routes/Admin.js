import express from 'express';
import bodyParser from 'body-parser';
// hmm
import formData from 'express-form-data';

import {
  oauthuser,
  loadSettings,
  uploadImage,
  saveSettings,
  deleteAccount,
} from '../controllers/Admin.js';

const router = express.Router();

router.use(bodyParser.json());
// hmm
router.use(formData.parse());

router.post('/oauthuser', oauthuser);

router.get('/loadSettings', loadSettings);
router.post('/uploadImage', uploadImage);
router.post('/saveSettings', saveSettings);
router.get('/delete', deleteAccount);

export default router;
