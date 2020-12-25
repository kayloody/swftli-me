import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportGoogle from 'passport-google-oauth';

import keys from './keys.js';
import User from '../models/swftli.js';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.serializeUser((user, done) => {
  if ('error' in user) {
    done(null, user);
  } else {
    done(null, user.id);
  }
});

passport.deserializeUser((id, done) => {
  if (typeof id === 'string') {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(new Error('Failed to deserialize a user'));
      });
  } else {
    done(null, id);
  }
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ user_lower: username.toLowerCase() }).exec((err, doc) => {
      if (err) {
        return done(err);
      }
      if (!doc) {
        return done(null, {
          error: 'Invalid username.',
          field: 'username',
        });
      }
      if (!bcrypt.compareSync(password, doc.password) || password === '') {
        return done(null, {
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
          return done(null, doc);
        } else {
          User.create(
            {
              username: `tmp${profile.emails[0].value}`,
              email: profile.emails[0].value,
              password: '',
              oauth: { service: 'google', new: true },
              userImg: profile.photos[0].value,
            },
            (err, doc) => {
              if (err) {
                return done(err);
              } else {
                return done(null, doc);
              }
            }
          );
        }
      });
    }
  )
);

export default passport;
