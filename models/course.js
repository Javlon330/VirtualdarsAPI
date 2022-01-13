const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./category')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
    category:{
        type: categorySchema,
        required: true
    },
    trainer: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    status: {
        type: String,
        enum: ['Active','Inactive'],
        required: true
    },
    fee: {
        type: Number,
        required: true,
        min: 0
    }
})

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course){
    const schema = {
        title: Joi.string().required().min(5).max(200),
        categoryId: Joi.string().required(),
        trainer: Joi.string().required(),
        status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()),
        fee: Joi.number().required().min(0)
    };
    
    return Joi.object(schema).validate(course, schema);
}

exports.validate = validateCourse;
exports.Course = Course;
exports.courseSchema = courseSchema;