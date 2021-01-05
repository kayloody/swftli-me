import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  user_lower: { type: String, lowercase: true },
  email: { type: String, required: true, unique: true },
  password: String,
  passwordReset: { type: Number, default: '0' },
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
    bgAngle: String,
    bgImg: String,
    bgChoice: String,
    cardColor1: String,
    cardColor2: String,
    cardAngle: String,
    cardImg: String,
    cardChoice: String,
    textColor: String,
    socialColor: String,
    borderColor: String,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
