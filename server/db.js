const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');

function collection() {
    MongoClient.connect(`mongodb://${settings.host}:${settings.port}/${settings.db}`, {}, function (err, db) {
        if (err) {
            console.log('连接失败！');
            return {};
        } else {
            console.log('连接成功！');
            return db;

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

module.exports = collection();
