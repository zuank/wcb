const user = require('./user')
const journey = require('./journey')

module.exports = (app) => {
    user(app)
    journey(app)
}