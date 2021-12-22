import express from 'express'
import bodyParser from 'body-parser'

import authRouter from './routes/auth'
import userRouter from './routes/users'
import trainingRouter from './routes/training'

const port = 4242;
const app = express();

app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next();
});
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
  res.status(200).end();
});

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/training', trainingRouter)

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
