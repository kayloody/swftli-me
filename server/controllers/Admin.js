import pkg from 'validate-color';
const { validateHTMLColor, validateHTMLColorName } = pkg;
import cloudinary from 'cloudinary';

import User from '../models/swftli.js';
import keys from '../config/keys.js';
import cloudinaryConfig from '../config/cloudinary.js';

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
      ).exec((err) => {
        if (err) {
          res.json({ error: 'Database Error' });
        } else {
          res.json({ okay: username });
        }
      });
    }
  });
};

export const loadCards = (req, res) => {
  const username = req.user.username;
  User.findOne({ user_lower: username.toLowerCase() })
    .select('userImg links')
    .exec((err, doc) => {
      if (err) {
        res.json({ status: 'Error' });
      } else {
        if ('links' in doc) {
          res.json(doc);
        } else {
          res.json({
            userImg: doc.userImg,
            status: 'No cards',
          });
        }
      }
    });
};

export const saveCards = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  delete data.status;
  delete data.userImg;

  User.findByIdAndUpdate(id, { links: data }, { new: true }).exec(
    (err, doc) => {
      if (err) {
        res.json({ status: 'Error' });
      } else {
        res.json({ status: 'Okay' });
      }
    }
  );
};

export const loadSettings = (req, res) => {
  const username = req.user.username;
  User.findOne({ user_lower: username.toLowerCase() })
    .select('userImg settings socials')
    .exec((err, doc) => {
      if (err) {
        res.json({ status: 'Error' });
      } else {
        if ('settings' in doc) {
          res.json(doc);
        } else {
          res.json({
            userImg: doc.userImg,
            socials: doc.socials,
            status: 'No custom settings',
          });
        }
      }
    });
};

export const uploadImage = (req, res) => {
  const id = req.user.id;
  const image = Object.values(req.files)[0];

  if (image.fieldName === 'userImg') {
    cloudinary.v2.uploader
      .upload(image.path, {
        public_id: image.fieldName,
        folder: id,
        width: 200,
        height: 200,
        gravity: 'face',
        crop: 'thumb',
      })
      .then((cloud) => {
        User.findByIdAndUpdate(id, { userImg: cloud.url }, { new: true }).exec(
          (err, doc) => {
            if (err) {
              res.json({ status: 'Error' });
            } else {
              res.json({ url: cloud.url });
            }
          }
        );
      })
      .catch(() => {
        res.json({ status: 'Error' });
      });
  } else {
    cloudinary.v2.uploader
      .upload(image.path, {
        public_id: image.fieldName,
        folder: id,
      })
      .then((cloud) => {
        res.json({ url: cloud.url });
      })
      .catch(() => {
        res.json({ status: 'Error' });
      });
  }
};

export const deleteImage = (req, res) => {
  const id = req.user.id;

  cloudinary.v2.uploader
    .destroy(id + '/userImg')
    .then(() => {
      User.findByIdAndUpdate(id, { userImg: '' }).exec((err, doc) => {
        if (err) {
          res.json({ status: 'Error' });
        } else {
          res.json({ status: 'Okay' });
        }
      });
    })
    .catch(() => {
      res.json({ status: 'Error' });
    });
};

export const saveSocials = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  delete data.status;
  delete data.userImg;
  delete data.settings;

  User.findByIdAndUpdate(id, { socials: data }).exec((err) => {
    if (err) {
      res.json({ status: 'Error' });
    } else {
      res.json({ status: 'Okay' });
    }
  });
};

export const saveSettings = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  delete data.status;
  delete data.userImg;
  delete data.socials;

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
    User.findByIdAndUpdate(id, { settings: data }).exec((err) => {
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
  const id = req.user.id;

  cloudinary.v2.api
    .delete_resources_by_prefix(id)
    .then(() => {
      User.findByIdAndDelete(id).exec((err) => {
        if (err) {
          res.json({ status: 'Error' });
        } else {
          res.json({ status: 'Okay' });
        }
      });
    })
    .catch(() => {
      res.json({ status: 'Error' });
    });
};
