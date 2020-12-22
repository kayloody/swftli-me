import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportGoogle from 'passport-google-oauth';
import session from 'express-session';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

import keys from './config/keys.js';

import authRoutes from './routes/Auth.js';
import adminRoutes from './routes/Admin.js';
import swftliRoutes from './routes/Swftli.js';

import User from './models/swftli.js';

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

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

app.use(
  cookieSession({
    name: 'session',
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ user_lower: username.toLowerCase() }).exec((err, doc) => {
      if (err) {
        return done(err);
      }
      if (!doc) {
        return done(null, false, {
          error: 'Invalid username.',
          field: 'username',
        });
      }
      if (!bcrypt.compareSync(password, doc.password) || password === '') {
        return done(null, false, {
          error: 'Invalid password.',
          field: 'password',
        });
      }
      return done(null, doc);
    });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/googleCB',
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value }).exec((err, doc) => {
        if (err) {
          return done(err);
        } else if (doc) {
          return done(null, doc, false);
        } else {
          User.create({
            email: profile.emails[0].value,
            password: '',
            oauth: { service: 'google', new: true },
            userImg: profile.photos[0].value,
          });
          return done(null, doc, true);
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error('Failed to deserialize an user'));
    });
});

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', swftliRoutes);
