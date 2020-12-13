import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  email: { type: String, required: true, unique: true },
  links: [{ name: String, url: String, enabled: Boolean }],
  socials: [{ name: String, url: String }],
  settings: {
    userImg: String,
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
