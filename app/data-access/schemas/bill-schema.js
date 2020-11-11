'use strict'

const Joi = require('joi');

const BILL_SCHEMA = Joi.object().keys({
    id: Joi.string().guid().required(),
    type: Joi.string().trim().required(),
    amount: Joi.number().required()
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
