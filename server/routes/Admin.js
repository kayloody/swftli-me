import express from 'express';
import bodyParser from 'body-parser';

import { oauthuser } from '../controllers/Admin.js';

const router = express.Router();

router.use(bodyParser.json());

router.post('/oauthuser', oauthuser);

export default router;
