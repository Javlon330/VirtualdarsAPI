const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Category = mongoose.model('Category', categorySchema);

function validationItems(category) {
    const schema = {
        name: Joi.string().required().min(3)
    };

    return Joi.object(schema).validate(category, schema);
}
exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validationItems;