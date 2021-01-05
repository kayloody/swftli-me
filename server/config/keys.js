const DB_USER = 'admin';
const DB_PASSWORD = 'O6tOfiMsyLSsGta0';
const MONGODB = {
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vnm2t.mongodb.net/<dbname>?retryWrites=true&w=majority`,
};

const GOOGLE_TOKENS = {
  GOOGLE_CLIENT_ID:
    '254116826845-bqrev7seo1ipgqh2d6bk6lmu7t17ebh1.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: '7UyqixfBGztoTvHyGgnDVq2E',
};

const SESSION = {
  COOKIE_KEY: 'twentyventicaramelfrappewithnutella',
};

const CLOUDINARY_KEYS = {
  CLOUD_URL:
    'CLOUDINARY_URL=cloudinary://297792667697841:Y9MVqbeiRK80qokLW9tMnu6SAUA@swftli-me',
};

const EMAIL_KEYS = {
  EMAIL_HOST: 'smtp.porkbun.com',
  EMAIL_USER: 'admin@swftli.me',
  EMAIL_PASSWORD: '35Ed9bCBzbbNTgJh',
};

const KEYS = {
  ...MONGODB,
  ...GOOGLE_TOKENS,
  ...SESSION,
  ...CLOUDINARY_KEYS,
  ...EMAIL_KEYS,
};

export default KEYS;
