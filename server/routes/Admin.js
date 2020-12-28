import express from 'express';
import bodyParser from 'body-parser';

import { deleteAccount, oauthuser } from '../controllers/Admin.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/delete', deleteAccount);

router.post('/oauthuser', oauthuser);

export default router;
