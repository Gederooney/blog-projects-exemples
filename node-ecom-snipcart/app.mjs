import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ejs from 'ejs';
import cors from 'cors';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import indexRouter from './routes/index.mjs';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
// app.use(
//   helmet.contentSecurityPolicy({
//     imageSrc: [
//       "'self'",
//       'https://www.google-analytics.com',
//       'https://tailwindui.com/img/ecommerce-images/home-page-01-hero-full-width.jpg',
//     ],
//   }),
// );
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  console.log(err.message);
  res.render('error', {
    title: 'Error',
    message:
      err.status === 404
        ? "La page que vous cherchez n'existe pas ou a été deplacé."
        : "Ouppss, quelque chose s'est mal passé.",
    status: err.status || 500,
    referrer: req.get('Referrer') || '/',
  });
});

export default app;
