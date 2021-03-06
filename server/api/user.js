const ObjectId = require('mongodb').ObjectID

module.exports = (app, db) => {
    app.post('/api/reg', (req, res) => {
        if (req.body.userName === '') {
            res.status(200).json({
                status: 1,
                error: '用户名不能为空'
            })
        }
        if (req.body.password === '') {
            res.status(200).json({
                status: 1,
                error: '密码不能为空'
            })
        }
        db.collection('user', (error, collection) => {
            if (error) {
                return
            }
            collection.insert(
                {
                    userName: req.body.userName,
                    password: req.body.password
                },
                (error_, result) => {
                    res.status(200).json({
                        status: 0,
                        userName: req.body.userName
                    })
                }
            )
        })
    })
    app.post('/api/login', (req, res) => {
        db.collection('user', (error, collection) => {
            if (error) {
                return
            }
            collection.findOne(req.body, (err, result) => {
                if (result) {
                    res.cookie('user', result._id, {
                        expires: new Date(Date.now() + 900000),
                        httpOnly: true
                    })
                    req.session.userName = result.userName
                    req.session.userId = result._id

                    res.status(200).json({
                        status: 0,
                        userName: result.userName,
                        userId: result._id
                    })
                } else {
                    res.status(200).json({
                        status: 1,
                        error: '用户名不存在或密码错误'
                    })
                }
            })
        })
    })

    app.get('/api/logout', (req, res) => {
        res.clearCookie('user')
        res.status(200).json({
            status: 0
        })
    })

    app.get('/api/user/info', (req, res) => {
        const userId = req.session.userId
        db.collection('user', (error, collection) => {
            if (error) {
                return
            }
            collection.findOne({ _id: ObjectId(userId) }, (err, result) => {
                if (result) {
                    res.status(200).json({
                        status: 0,
                        result: {
                            userName: result.userName,
                            userId: result._id,
                            tel: result.tel,
                            discription: result.discription
                        }
                    })
                } else {
                    res.status(200).json({ status: 1, error: '用户不存在' })
                }
            })
        })
    })

    app.post('/api/user/update', (req, res) => {
        const userId = req.session.userId
        db.collection('user', (error, collection) => {
            collection.update(
                { _id: ObjectId(userId) },
                {
                    $set: {
                        userName: req.body.userName,
                        tel: req.body.tel,
                        discription: req.body.discription
                    }
                },
                (err, result) => {
                    if (result) {
                        if (result) {
                            res.status(200).json({
                                status: 0,
                                result: {
                                    userName: req.body.userName,
                                    tel: req.body.tel,
                                    discription: req.body.discription,
                                    userId: req.session.userId
                                }
                            })
                        } else {
                            res.status(200).json({
                                status: 1,
                                error: "更新失败"
                            })
                        }
                    }
                }
            )
        })
    })
}
