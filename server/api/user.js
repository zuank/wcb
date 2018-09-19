const ObjectId = require('mongodb').ObjectID
function checkLogin(req, res, next) {
  if (!req.session.userName) {
    req.flash('error', '用户未登录！');
    res.redirect('/');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.userName) {
    req.flash('error', '用户已登录！');
  }
  next();
}
module.exports = (app, db) => {
  app.post('/api/reg', (req, res) => {
    if (req.body.userName === '') {
      res.status(200).json({
        status: 1,
        error: '用户名不能为空'
      });
    }
    if (req.body.password === '') {
      res.status(200).json({
        status: 1,
        error: '密码不能为空'
      });
    }
      db.collection('user', (error, collection) => {
        if (error) {
          return;
        }
        collection.insert({
          userName: req.body.userName,
          password: req.body.password
        }, (error_, result) => {
          res.status(200).json({
            status: 0,
            userName: req.body.userName
          });
        });
    });
  });

  app.post('/api/login', (req, res) => {
      db.collection('user', (error, collection) => {
        if (error) {
          return;
        }
        collection.findOne(req.body, (err, result) => {
          if (result) {
            res.cookie('user', result._id, { expires: new Date(Date.now() + 900000), httpOnly: true });
              req.session.userName = result.userName;
              req.session.userId = result._id

            res.status(200).json({
              status: 0,
              userName: result.userName,
              userId: result._id
            });
          } else {
            res.status(200).json({ status: 1, error: '用户名不存在或密码错误' });
          }
      });
    });
  });

  app.get('/api/logout', (req, res) => {
    res.clearCookie('user');
    res.status(200).json({
      status: 0
    });
  });

  app.get('/api/user/info', (req, res) => {

    const userId = req.cookies.user
    db.collection('user', (error, collection) => {
      if (error) {
        return;
      }
      collection.findOne({_id: ObjectId(userId)}, (err, result) => {
        if (result) {
          res.status(200).json({
            status: 0,
            result: result
          });
          return
        } else {
          res.status(200).json({ status: 1, error: '用户不存在' });
          return
        }
      });
    });
  });
};
