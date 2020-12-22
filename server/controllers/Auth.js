import passport from 'passport';
import bcrypt from 'bcrypt';

import User from '../models/swftli.js';

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';

const saltRounds = bcrypt.genSaltSync(10);

export const status = (req, res) => {
  if (req.user) {
    res.json({
      auth: true,
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.json({ auth: false });
  }
};

export const signup = (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  if (validateEmail(email)) {
    User.findOne({ email }).exec((err, doc) => {
      if (err) {
        console.log(error);
        res.json({ error: 'Database Error' });
      } else if (doc) {
        res.json({
          error: `Another account is using ${email}.`,
          field: 'email',
        });
      } else {
        User.findOne({ user_lower: username.toLowerCase() }).exec(
          (err, doc) => {
            if (err) {
              console.log(err);
              res.json({ error: 'Database Error' });
            } else if (doc) {
              res.json({
                error: `${username} is already taken.`,
                field: 'username',
              });
            } // FUTURE: Include username restrictions
            else {
              if (!passwordStrength(password)) {
                res.json({
                  error:
                    'Password must contain 8 characters, upper and lowercase letters, a number and a special character.',
                  field: 'password',
                });
              } else {
                var hash = bcrypt.hashSync(password, saltRounds);

                User.create(
                  {
                    username,
                    user_lower: username.toLowerCase(),
                    email,
                    password: hash,
                  },
                  (err) => {
                    if (err) {
                      console.log(err);
                      res.json({ error: 'Database Error' });
                    } else {
                      res.json({ okay: username });
                    }
                  }
                );
              }
            }
          }
        );
      }
    });
  } else {
    res.json({
      error: 'Please enter a valid email address',
      field: 'email',
    });
  }
};

export const login = (req, res) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      res.json({ error: 'Database Error' });
    } else if (user) {
      res.json({ okay: user.username });
    } else {
      res.json(info);
    }
  })(req, res);
};

export const google = (req, res) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
};

export const googleCB = (req, res) => {
  passport.authenticate('google', { session: false }, (err, user, newUser) => {
    if (err) {
      res.redirect(CLIENT_HOME_PAGE_URL);
    } else if (newUser == true) {
      res.redirect(`${CLIENT_HOME_PAGE_URL}/new`);
    } else {
      res.redirect(`${CLIENT_HOME_PAGE_URL}/${user.username}`);
    }
  })(req, res);
};

const passwordStrength = (password) => {
  let reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/;
  return password.length > 7 && reg.test(password);
};

const validateEmail = (email) => {
  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
};
