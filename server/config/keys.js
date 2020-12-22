const DB_USER = 'admin';
const DB_PASSWORD = '0Y5xa4luLzY1Cqaf';
const MONGODB = {
  MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vnm2t.mongodb.net/<dbname>?retryWrites=true&w=majority`,
};

const GOOGLE_TOKENS = {
  GOOGLE_CLIENT_ID:
    '254116826845-bqrev7seo1ipgqh2d6bk6lmu7t17ebh1.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: '4aQBWvnvq65BVxnlTcXvd9tU',
};

const SESSION = {
  COOKIE_KEY: 'nutellaswftlimecookie',
};

const KEYS = {
  ...MONGODB,
  ...GOOGLE_TOKENS,
  ...SESSION,
};

export default KEYS;
