import bcrypt from 'bcrypt';

import User from '../models/swftli.js';

const saltRounds = 10;

export const signup = (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email }).exec((err, doc) => {
    if (err) {
      console.log(error);
      res.json({ Error: 'Database Error' });
    } else if (doc) {
      res.json({ Error: `Another account is using ${email}.`, Field: 'email' });
    } else {
      User.findOne({ user_lower: username.toLowerCase() }).exec((err, doc) => {
        if (err) {
          console.log(err);
          res.json({ Error: 'Database Error' });
        } else if (doc) {
          res.json({
            Error: `${username} is already taken.`,
            Field: 'username',
          });
        } // FUTURE: Include username restrictions
        else {
          if (!passwordStrength(password)) {
            res.json({
              Error:
                'Password must contain 8 characters, upper and lowercase letters, a number and a special character.',
              Field: 'password',
            });
          } else {
            bcrypt.hash(password, saltRounds, function (err, hash) {
              if (err) {
                console.log(err);
                res.json({ Error: 'Database Error' });
              } else {
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
                      res.json({ Error: 'Database Error' });
                    } else {
                      res.json({ Okay: username });
                    }
                  }
                );
              }
            });
          }
        }
      });
    }
  });
};

const passwordStrength = (password) => {
  if (
    password.length > 7 &&
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\s])/.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

export const login = (req, res) => {};
