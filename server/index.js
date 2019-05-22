const express = require('express');
const api = require('./api');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const settings = require('./settings');
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


const notNeedLogin = ['/api/login','/api/reg'] // 登陆白名单
// 拦截器
app.use(function(req, res, next){
    if (req.session.userId) {
        next()
    } else if (notNeedLogin.includes(req.url)){
        next()
    } else {
        res.send(200).json({
            status: -1,
            error: '用户未登录'
        })
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port);

api(app);
