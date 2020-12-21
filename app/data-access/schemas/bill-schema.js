'use strict'

const Joi = require('@hapi/joi');

const BILL_SCHEMA = Joi.object().keys({
    type: Joi.string().trim().required(),
    price: Joi.number().required(),
    date: Joi.string().trim().required(),
    isPositiveCost: Joi.boolean().required()
}).label('bill');


const validate = (data) => {
    return Joi.validate(data, BILL_SCHEMA, {
        abortEarly: false,
        allowUnknown: true,
        convert: true,
        presence: 'required'
    });
};

module.exports = {
    validate
};
