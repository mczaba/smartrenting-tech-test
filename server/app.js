import express from 'express'
import bodyParser from 'body-parser'

import authRouter from './routes/auth'

const port = 4242;
const app = express();

app.use((req, res, next) => {
  // Resolving CORS problems by accepting * as origin
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json())

app.get('/hello', (req, res) => {
  res.status(200).end();
});

app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
