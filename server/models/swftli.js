import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  user_lower: { type: String, lowercase: true },
  email: { type: String, required: true, unique: true },
  password: String,
  oauth: {
    service: { type: String, default: 'local', immutable: true },
    new: { type: Boolean, default: false },
  },
  userImg: { type: String, default: '' },
  socials: [{ name: String, uid: String }],
  links: [{ name: String, url: String, enabled: Boolean }],
  settings: {
    bgColor1: String,
    bgColor2: String,
    bgAngle: Number,
    bgImg: String,
    bgChoice: Number,
    cardColor1: String,
    cardColor2: String,
    cardAngle: Number,
    cardImg: String,
    carChoice: Number,
    textColor: String,
    socialColor: String,
    borderColor: String,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
