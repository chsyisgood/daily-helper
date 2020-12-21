'use strict'

const Joi = require('joi');

const BILL_TYPE_SCHEMA = Joi.object().keys({
    id: Joi.string().guid().required(),
    title: Joi.string().trim().required(),
    is_default_point_cost: Joi.boolean().required(),
    is_positive_cost: Joi.boolean().required(),
    priority: Joi.number().required()
}).label('billType');

const validate = (data) => {
    return Joi.validate(data, BILL_TYPE_SCHEMA, {
        abortEarly: false,
        allowUnknown: true,
        convert: true,
        presence: 'required'
    });
};

module.exports = {
    validate
};
