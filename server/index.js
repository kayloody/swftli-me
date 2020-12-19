import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//import App from '../client/public/index.html';

import authRoutes from './routes/Auth.js';
import adminRoutes from './routes/Admin.js';
import swftliRoutes from './routes/Swftli.js';

const app = express();

app.use(cors());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/users', swftliRoutes);

const DB_URI =
  'mongodb+srv://admin:0Y5xa4luLzY1Cqaf@cluster0.vnm2t.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.lof(error.message));
