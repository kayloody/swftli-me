import express from 'express';
import bodyParser from 'body-parser';
import formData from 'express-form-data';

import {
  oauthUser,
  passwordReset,
  loadCards,
  saveCards,
  loadSettings,
  uploadImage,
  deleteImage,
  saveSocials,
  saveSettings,
  deleteAccount,
} from '../controllers/Admin.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(formData.parse());

router.post('/oauthUser', oauthUser);
router.post('/passwordReset', passwordReset);

router.get('/loadCards', loadCards);
router.post('/saveCards', saveCards);

router.get('/loadSettings', loadSettings);
router.post('/uploadImage', uploadImage);
router.get('/deleteImage', deleteImage);
router.post('/saveSocials', saveSocials);
router.post('/saveSettings', saveSettings);
router.get('/deleteAccount', deleteAccount);

export default router;
