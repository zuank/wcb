const express = require('express');
// const http = require('http');;
// const httpProxy = require('http-proxy')
// const configIO = require('./io');
const api = require('./api');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const settings = require('./settings');
const path = require('path');
const cookie = require('cookie-parser');

const app = express();

app.use(cookie())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  store: new MongoStore({
    url: 'mongodb://localhost/wcb',
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port);

api(app);
