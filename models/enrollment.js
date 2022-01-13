const mongoose = require('mongoose');
const Joi = require('joi');
const { customerSchema } = require('./customer')
const { courseSchema } = require('./course')
const Schema = mongoose.Schema


const enrollmentSchema = new Schema({
    customer: {
        type: new Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },  
        }),
        required: true
    },
    course: {
        type:  new Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 200
            }
        }),
        required: true
    },
    courseFee: {
        type: Number,
        min: 0
    },
    dateStart: {
        type:  Date,
        default: Date.now,
        required: true
    }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

function validateEnrollments(enrollment){
    const schema = {
        customerId: Joi.required(),
        courseId: Joi.required()
    };

    return Joi.object(schema).validate(schema, enrollment);
}

exports.Enrollment = Enrollment;
exports.validate = validateEnrollments;