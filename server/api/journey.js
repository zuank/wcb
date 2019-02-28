const ObjectId = require('mongodb').ObjectID;

module.exports = (app, db) => {

    app.post('/api/journey', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }

            const params = {
                ...req.body,
                userId: ObjectId(req.session.userId)
            };

            collection.insert(params, (error_, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        id: result._id
                    })
                } else {
                    res.status(200).json({
                        status: -1,
                        msg: '注册失败'
                    })
                }
            });
        });
    });


    /**
     * 获取行程列表
     * req: {
     *  limit: Number
     *  page: Number
     * }
     */
    app.get('/api/journeys', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }

            collection.aggregate([{
                $lookup: {
                    from: "user",
                    localField: "userId",
                    foreignField: '_id',
                    as: "inventory_docs"
                },
                // $unwind: {
                //     path: "$inventory_docs"
                // }

            }]).toArray((err, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        list: result
                    });
                } else {
                    res.status(200).json({
                        status: 1,
                        error: err
                    });
                }
            })

            // collection.find().toArray((err, result) => {
            //     if (result) {
            //         res.status(200).json({
            //             status: 0,
            //             list: result
            //         });
            //     } else {
            //         res.status(200).json({
            //             status: 1,
            //             error: ''
            //         });
            //     }
            // });
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
                    'joinedUserId': ObjectId(req.session.userId)
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
