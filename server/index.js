import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//import App from '../client/public/index.html';

import loginSignupRoutes from './routes/LoginSignup.js';
import myRoutes from './routes/Admin.js';
import usersRoutes from './routes/Swftli.js';

const app = express();

app.get('/', (req, res) => {
  res.sendFile('/client/public/index.html', { root: '../' });
});

app.use('/', loginSignupRoutes);
app.use('/admin', myRoutes);
app.use('/', usersRoutes);

app.use(cors());

const DB_URI =
  'mongodb+srv://admin:0Y5xa4luLzY1Cqaf@cluster0.vnm2t.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

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
