const user = require('./user')
const journey = require('./journey')
const MongoClient = require('mongodb').MongoClient;
const settings = require('../settings');


module.exports = (app) => {
    MongoClient.connect(`mongodb://${settings.host}:${settings.port}/${settings.db}`, {}, function (err, db) {
        if (err) {
            console.log('连接失败！');
            return {};
        } else {
            console.log('连接成功！');
            user(app, db)
            journey(app, db)

            // 注销数据库
            // db.logout(function(err, result) {
            //     if ( err ) {
            //         console.log('注销失败...');
            //     }

            //     db.close();  // 关闭连接
            //     console.log('连接已经关闭！');
            // });
            // module.exports = db

        }
    });
}