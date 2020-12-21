'use strict'

const mongoDB = require('mongodb').MongoClient;
let _dbClient;      // Singleton

const COLLECTIONS = {
    BILL: 'bill',
    BILL_TYPE: 'bill.type',
    REPORT: 'report',
    MEMBER: 'member'
};

const QUERY_LIST_LIMIT = 999;

const getDBClinet = async () => {
    if (_dbClient) return _dbClient;

    console.log(process.env.DB_PORT, process.env.DB_NAME);

    const connection = await mongoDB.connect(`mongodb://localhost:${process.env.DB_PORT}`);
    _dbClient = connection.db(process.env.DB_NAME);

    console.log(`SUCCESSfully Connected to the DB: ${process.env.DB_NAME}...`);

    return _dbClient;
};

/**
 * queryById
 * 
 * @param {Object} collection 
 * @param {string} id 
 */
const queryById = async (collection, id) => {
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

const queryByField = async (collection, fieldName, fieldValue) => {
    try {
        const client = await getDBClinet();

        const result = await client
                        .collection(collection)
                        .findOne( { [fieldName]: fieldValue } );
        
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

/**
 * persistOne
 * 
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

const queryAll = async (collection, limit = QUERY_LIST_LIMIT, sortField, sortFlag) => {
    try {
        const client = await getDBClinet();

        console.log("*********************", collection);

        const data = await client.collection(collection)
            .find().limit(limit)
            .sort({ [sortField]: (sortFlag ? 1 : -1) })
            .toArray();
        
        return data;
    } catch (err) {
        throw new Error(err);
    }
};

const findOneAndUpdate = async (collection, query, update, options) => {
    try {
        const client = await getDBClinet();

        const result = await client.collection(collection)
            .findOneAndUpdate(query, update, options);

        return result;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    COLLECTIONS,

    getDBClinet,
    queryById,
    queryByField,
    findOneAndUpdate,
    queryAll,
    persistOne
};
