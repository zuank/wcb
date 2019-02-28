const db = require('../db');
const dbName = 'journey';

function insert(params, successCallback, errorCallback) {
    db.collection(dbName, (error, collection) => {
        if (error) {
            return;
        }
        collection.insert(params, (error_, result) => {
            if (result) {
                successCallback(result);
            } else {
                errorCallback();
            }
        });
    });
}

function find(params, successCallback, errorCallback) {
    db.collection(dbName, (error, collection) => {
        if (error) {
            return;
        }
        collection.find().toArray((error_, result) => {
            if (result) {
                successCallback(result);
            } else {
                errorCallback();
            }
        });
    });
}

module.exports = {
    insert,
    find
}