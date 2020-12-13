import express from 'express';
import { getUser } from '../controllers/UsersSwftli.js';

const router = express.Router();

router.get('/', getUser);

export default router;
