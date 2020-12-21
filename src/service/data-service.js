const axios = require('axios');
const { HOST_URL } = require('../constant');
const { ServiceResult } = require('../model/service-result');

const findAllBillTypes = async () => {
    try {
        const res = await axios({
            method: 'get',
            url: `${HOST_URL}/bill/types`
        });

        return new ServiceResult(true, res.data);
    } catch (err) {
        console.log(err);

        return new ServiceResult(false, err.toString());
    }
};

const createBill = async (bill) => {
    if(!bill) return;

    try {
        const res = await axios({
            method: 'post',
            url: `${HOST_URL}/bill/create`,
            data: {
                price: bill.price,
                billType: bill.billType,
                date: bill.date,
                isPositiveCost: bill.isPositiveCost
            }
        });

        return new ServiceResult(true, res.data);
    } catch (err) {
        console.log(err);
        return new ServiceResult(false, err.toString());
    }
};

const findReportByDate = async (date) => {
    try {
        const res = await axios({
            method: 'get',
            url: `${HOST_URL}/report/date=${date}`
        });

        return new ServiceResult(true, res.data);
    } catch (err) {
        console.log(err);
        return new ServiceResult(false, err.toString());
    }
};

const createOrUpdateReport = async (report, date) => {
    try {
        console.log(report);

        const res = await axios({
            method: 'post',
            url: `${HOST_URL}/report/create`,
            data: {
                report: report,
                date: date
            }
        });

        return new ServiceResult(true, res.data);
    } catch (err) {
        console.log(err);
        return new ServiceResult(false, err.toString());
    }
}

module.exports = {
    findAllBillTypes,
    findReportByDate,
    createOrUpdateReport,
    createBill
}
