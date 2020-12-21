const dataAccess = require('../data-access/utils/db');
const COLLECTIONS = dataAccess.COLLECTIONS;

const validate = (data, validator) => {
    const result = validator(data);

    if (result.error) {
        throw new Error(result.error.details[0].message);
    }
};

const findAllBillTypes = async () => {
    const data = await dataAccess.queryAll(COLLECTIONS.BILL_TYPE, 99, 'priority', true);
    return data;
};

const findReportByDate = async (date) => {
    const data = await dataAccess.queryByField(COLLECTIONS.REPORT, 'date', date);
    return data;
};

const findAndUpdateReport = async (report, date) => {
    const query = { date: date };
    const update = {
        $set: {
            ...report
        }
    };

    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const result = await dataAccess.findOneAndUpdate(COLLECTIONS.REPORT, query, update, options);
    return result;
};

const createBill = async (bill) => {
    validate(bill, require('../data-access/schemas/bill-schema').validate);
    
    const data = await dataAccess.persistOne(COLLECTIONS.BILL, bill);
    return data;
};

module.exports = {
    findAllBillTypes,
    findReportByDate,
    findAndUpdateReport,
    createBill
};
