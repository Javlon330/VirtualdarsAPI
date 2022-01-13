const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    bonusPoints: {
        type: Number,
        default: 1,
        required: true
    }

});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        isVip: Joi.boolean().required(),
        phone: Joi.string().required().min(5).max(50),
        bonusPoints: Joi.number().default(1)
    }

    return Joi.object(schema).validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
exports.customerSchema = customerSchema;