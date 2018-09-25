const ObjectId = require('mongodb').ObjectID;
const db = require('../db');
module.exports = (app) => {
    app.post('/api/journey', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }
            collection.insert(req.body, (error_, result) => {
                res.status(200).json({
                    status: 0,
                    id: result._id
                });
            });
        });
    });

    app.get('/api/journeys', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }
            collection.find().toArray((err, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        list: result
                    });
                } else {
                    res.status(200).json({
                        status: 1,
                        error: '用户名不存在或密码错误'
                    });
                }
            });
        });
    });

    app.get('/api/journey/:id', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }
            collection.findOne({
                _id: ObjectId(req.params.id)
            }, (err, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        result: result
                    })
                } else {
                    res.status(200).json({
                        status: 1,
                        error: '行程不存在'
                    });
                }
            });
        });
    });

    app.put('/api/journey/:id', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }
            collection.update({
                _id: ObjectId(req.params.id)
            }, {
                $addToSet: {
                    "userId": req.session.userId
                }
            }, (err, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        result: result
                    })
                } else {
                    res.status(200).json({
                        status: 1,
                        error: '行程不存在'
                    });
                }
            });
        });
    });
};
