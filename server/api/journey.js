const ObjectId = require('mongodb').ObjectID;

module.exports = (app, db) => {

    app.post('/api/journey', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }

            const params = {
                ...req.body,
                userId: ObjectId(req.session.userId),
                createTime: new Date()
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

            // $skip 跳过多少个文档
            // $limit 取多少个文档
            collection.aggregate([
                {$skip: (req.limit * (req.page - 1)) || 0},
                {$limit: req.limit || 10},
                {
                    $lookup: {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userInfo'
                    }
                },
                {
                    $unwind: {
                        path: '$userInfo',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        backDate: 1,
                        direction: 1,
                        goDate: 1,
                        name: 1,
                        stopDate: 1,
                        tel: 1,
                        userId: 1,
                        userName: '$userInfo.userName'
                    }
                }
            ]).toArray((err, result) => {
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
        });
    });

    app.get('/api/journey/:id', (req, res) => {
        db.collection('journey', (error, collection) => {
            if (error) {
                return;
            }

            collection.aggregate([
                {
                    $match: {
                        _id: ObjectId(req.params.id)
                    }
                },
                {
                    $unwind: {
                        path: '$joinedUserId',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'user',
                        localField: 'joinedUserId',
                        foreignField: '_id',
                        as: 'userInfo'
                    }
                },
                {
                    $unwind: {
                        path: '$userInfo',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                  $project: {
                      backDate: 1,
                      discription: 1,
                      goDate: 1,
                      name: 1,
                      stopDate: 1,
                      tel: 1,
                      userId: 1,
                      "userInfo.userName":'$userInfo.userName',
                      "userInfo._id":'$userInfo._id',
                  }
                },
                {
                    $group: {
                        _id: {
                            backDate: "$backDate",
                            discription: "$discription",
                            goDate: "$goDate",
                            name: "$name",
                            stopDate: "$stopDate",
                            tel: "$tel",
                            userId: "$userId",
                        },
                        joinedUserList: {$push: "$userInfo"}
                    }
                },
                {
                    $project:{
                        _id:0,
                        backDate: "$_id.backDate",
                        discription: "$_id.discription",
                        goDate: "$_id.goDate",
                        name: "$_id.name",
                        stopDate: "$_id.stopDate",
                        tel: "$_id.tel",
                        userId: "$_id.userId",
                        joinedUserList: '$joinedUserList'
                    }
                }
            ]).toArray((err, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        result: result[0]
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
