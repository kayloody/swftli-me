import pkg from 'validate-color';
const { validateHTMLColor, validateHTMLColorName } = pkg;

import User from '../models/swftli.js';

export const oauthuser = (req, res) => {
  const username = req.body.username;
  const email = req.user.email;

  User.findOne({ user_lower: username.toLowerCase() }).exec((err, doc) => {
    if (err) {
      res.json({ error: 'Database Error' });
    } else if (doc) {
      res.json({
        error: `${username} is taken`,
      });
    } else {
      User.findOneAndUpdate(
        { email: email },
        {
          username: username,
          user_lower: username.toLowerCase(),
          'oauth.new': false,
        }
      ).exec((err, doc) => {
        if (err) {
          res.json({ error: 'Database Error' });
        } else {
          console.log(doc);
          res.json({ okay: username });
        }
      });
    }
  });
};

export const settings = (req, res) => {
  const username = req.user.username;
  const data = req.body;
  delete data.status;

  if (data.bgChoice === '3') {
    delete data.bgColor1;
    delete data.bgColor2;
  }

  if (data.cardChoice === '3') {
    delete data.cardColor1;
    delete data.cardColor2;
  }

  let color = 'valid';
  for (var key in data) {
    if (
      key.includes('Color') &&
      !(validateHTMLColor(data[key]) || validateHTMLColorName(data[key]))
    ) {
      color = 'invalid';
      break;
    }
  }

  if (color === 'valid') {
    User.findOneAndUpdate(
      { user_lower: username.toLowerCase() },
      { settings: data }
    ).exec((err, doc) => {
      if (err) {
        res.json({ status: 'Error' });
      } else {
        res.json({ status: 'Okay' });
      }
    });
  } else {
    res.json({ status: 'Invalid Color' });
  }
};

export const deleteAccount = (req, res) => {
  const username = req.user.username;

  User.findOneAndDelete({ user_lower: username.toLowerCase() }).exec(
    (err, doc) => {
      if (err) {
        res.json({ status: 'Error' });
      } else {
        res.json({ status: 'Okay' });
      }
    }
  );
};
