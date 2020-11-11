'use strict'

const mongoDB = require('mongodb').MongoClient;
let _dbClient;      // Singleton

const COLLECTIONS = {
    BILL: 'bill',
    REPORT: 'report',
    MEMBER: 'member'
};

const getDBClinet = async () => {
    if (_dbClient) return _dbClient;

    console.log(process.env.DB_PORT, process.env.DB_NAME);

    const connection = await mongoDB.connect(`mongodb://localhost:${process.env.DB_PORT}`);
    _dbClient = connection.db(process.env.DB_NAME);

    return _dbClient;
};

/**
 * quiryById
 * @param {Object} collection 
 * @param {string} id 
 */
const quiryById = async (collection, id) => {
    try {
        const client = await getDBClinet();

        const result = await client
                        .collection(collection)
                        .findOne( { _id: id } );
        
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

/**
 * persistOne
 * @param {Object} collection 
 * @param {Object} data 
 */
const persistOne = async (collection, data) => {
    try {
        const client = await getDBClinet();

        await client.collection(collection).insertOne(data);

        return data;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    COLLECTIONS,

    getDBClinet,
    quiryById,
    persistOne
};
