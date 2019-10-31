const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  const date = new Date().toISOString(),
      method = req.method,
      reqUrl = req.originalUrl;
  console.log(date, method, reqUrl);
  next();
}
server.use(helmet());
server.use(logger);
server.use(express.json());
server.use('/api/users', userRouter);

module.exports = server;
