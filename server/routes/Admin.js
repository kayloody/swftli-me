import express from 'express';
import bodyParser from 'body-parser';
// hmm
import formData from 'express-form-data';

import {
  oauthuser,
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
// hmm
router.use(formData.parse());

router.post('/oauthuser', oauthuser);

router.get('/loadCards', loadCards);
router.post('/saveCards', saveCards);

router.get('/loadSettings', loadSettings);
router.post('/uploadImage', uploadImage);
router.get('/deleteImage', deleteImage);
router.post('/saveSocials', saveSocials);
router.post('/saveSettings', saveSettings);
router.get('/deleteAccount', deleteAccount);

export default router;
