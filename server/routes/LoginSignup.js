import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Login Signup');
});

export default router;
