import express from 'express';
import bodyParser from 'body-parser';

import { oauthuser, settings, deleteAccount } from '../controllers/Admin.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/oauthuser', oauthuser);
router.post('/settings', settings);
router.get('/delete', deleteAccount);

export default router;
