import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

import passport from 'passport';
import passportSetup from './config/passport-setup.js';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

import keys from './config/keys.js';

import authRoutes from './routes/Auth.js';
import adminRoutes from './routes/Admin.js';
import swftliRoutes from './routes/Swftli.js';

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.use(
  cookieSession({
    name: 'session',
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.1.80:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', swftliRoutes);
