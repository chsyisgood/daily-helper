'use strict'

const { COLLECTIONS, quiryById, persistOne } = require('./utils/db');

const get = quiryById(COLLECTIONS.BILL, id);

const create = persistOne(COLLECTIONS.BILL, data);

module.exports = {
    get,
    create
};
