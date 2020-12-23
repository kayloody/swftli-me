import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import passportGoogle from 'passport-google-oauth';

import keys from './keys.js';
import User from '../models/swftli.js';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      console.log('Deserialize:', user.username);
      //console.log('Deserialize', user);
      done(null, user);
    })
    .catch((err) => {
      done(new Error('Failed to deserialize a user'));
    });
});

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

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.GOOGLE_CLIENT_ID,
//       clientSecret: keys.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/googleCB',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ email: profile.emails[0].value }).exec((err, doc) => {
//         if (err) {
//           return done(err);
//         } else if (doc) {
//           return done(null, doc, false);
//         } else {
//           User.create({
//             email: profile.emails[0].value,
//             password: '',
//             oauth: { service: 'google', new: true },
//             userImg: profile.photos[0].value,
//           });
//           return done(null, doc, true);
//         }
//       });
//     }
//   )
// );

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
          User.create({
            email: profile.emails[0].value,
            password: '',
            oauth: { service: 'google', new: true },
            userImg: profile.photos[0].value,
          });
          return done(null, doc);
        }
      });
    }
  )
);

export default passport;
