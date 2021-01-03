import bcrypt from 'bcrypt';
import badwordsList from 'badwords-list';

import User from '../models/swftli.js';

const CLIENT_HOME_PAGE_URL = process.env.PUBLIC_URL
  ? process.env.PUBLIC_URL + ':3000'
  : 'http://localhost:3000';
const saltRounds = bcrypt.genSaltSync(10);

export const status = (req, res) => {
  if (req.user && !('error' in req.user)) {
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
        res.json({ error: 'Database Error' });
      } else if (doc) {
        res.json({
          error: `Another account is using ${email}.`,
          field: 'email',
        });
      } else {
        if (!validateUsername(username)) {
          res.json({
            error:
              'Username must be shorter than 11 characters and only contain alphanumerics.',
            field: 'username',
          });
        } else if (!filterUsername(username)) {
          res.json({
            error: 'Invalid username.',
            field: 'username',
          });
        } else {
          User.findOne({ user_lower: username.toLowerCase() }).exec(
            (err, doc) => {
              if (err) {
                res.json({ error: 'Database Error' });
              } else if (doc) {
                res.json({
                  error: `${username} is already taken.`,
                  field: 'username',
                });
              } // FUTURE: Include username restrictions (illegal paths, bad usernames)
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
  res.json(req.user);
};

export const googleCB = (req, res) => {
  res.redirect(CLIENT_HOME_PAGE_URL);
};

export const logout = (req, res) => {
  req.logout();
  res.json({ okay: 'Logout successful' });
};

const passwordStrength = (password) => {
  let reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/;
  return password.length > 7 && reg.test(password);
};

const validateEmail = (email) => {
  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
};

const validateUsername = (username) => {
  let reg = /[^a-zA-Z\d]/;
  return username.length < 11 && !reg.test(username);
};

const filterUsername = (username) => {
  const badwordsArray = badwordsList.array;

  return !badwordsArray.some((word) => username.includes(word));
};
