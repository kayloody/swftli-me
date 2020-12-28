import User from '../models/swftli.js';

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
