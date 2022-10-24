const express = require('express');
const app = express();
const MethodNotAllowed = require('./error/methodNotAllowed');
require('express-async-errors');
const cors = require('cors');

// parser
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000']
}));

app.listen(3001, () => {
  console.log('http://localhost:3001');
});

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | ${new Date().toLocaleString()}`);
  next();
});

const userRouter = require('./user');
app.use('/user', userRouter);

const postRouter = require('./post');
app.use('/post', postRouter);

app.all('*', (res, req) => {
  throw new MethodNotAllowed();
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ 
      name: error.name || 'Internal Server Error',
      message: error.message || '서버 내부에서 오류가 발생했습니다.'
    });
});
