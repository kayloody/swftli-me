import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth';

import authRoutes from './routes/Auth.js';
import adminRoutes from './routes/Admin.js';
import swftliRoutes from './routes/Swftli.js';

import User from '../models/swftli.js';

const app = express();

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

app.use(cors());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', swftliRoutes);

const DB_URI =
  'mongodb+srv://admin:0Y5xa4luLzY1Cqaf@cluster0.vnm2t.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.lof(error.message));
