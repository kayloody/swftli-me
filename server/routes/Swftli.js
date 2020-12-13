import express from 'express';
import { getUser } from '../controllers/Swftli.js';

const router = express.Router();

router.get('/:uid', getUser);

export default router;
