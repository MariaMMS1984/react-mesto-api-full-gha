require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const cors = require('cors');

const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const ErrorNotFound = require('./errors/notfound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const {
  createUser, login,
} = require('./controllers/users');
const { validateCreateUser, validateLogin } = require('./middlewares/validate');

app.use(requestLogger);
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => {
  next(new ErrorNotFound('Такой страницы не существует.'));
});
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
