import User from '../models/swftli.js';

export const getUser = (req, res) => {
  const user = req.params.uid;
  if (user.includes('/')) {
    req.json({ Error: 'Invalid Username' });
  } else {
    User.findOne({ username: user })
      .select({ _id: 0, password: 0, email: 0 })
      .exec((err, doc) => {
        if (err) {
          console.log(error);
          res.json({ Error: 'Database Error' });
        } else if (doc == null) {
          res.json({ Error: 'No User Found' });
        } else {
          res.json(doc);
        }
      });
  }
};
