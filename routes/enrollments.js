const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { Course } = require('../models/course');
const { Enrollment, validate } = require('../models/enrollment');


router.get('/', async (req, res) => {
    const enrollments = await Enrollment.find().sort('-dateStart');
    res.send(enrollments);
});

router.post( '/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message)
    };
    
    const customerId = mongoose.Types.ObjectId.isValid(req.body.customerId);
    const courseId = mongoose.Types.ObjectId.isValid(req.body.courseId);
    if(!courseId) return res.status(400).send("Id courseId xato")
    if(!customerId) return res.status(400).send("Id customerId xato")
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer){
        return res.status(404).send("Berilgan Id dagi mijoz topilmadi...");
    };
    const course = await Course.findById(req.body.courseId);
    if(!course) { 
        return res.status(404).send("Berilgan Id dagi course topilmadi.")
    }
    let enrollment = new Enrollment({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        },
        courseFee: course.fee
    });

    if (customer.isVip){
        enrollment.courseFee = course.fee - (0.2 * course.fee)
    };

    enrollment = await enrollment.save();

    customer.bonusPoints++;
    customer.save();

    res.send(enrollment);
});

router.get( '/:id', async (req, res) => {
    const enrollment = await Enrollment.findById(req.params.id);

    if(!enrollment) {
        return res.status(404).send(" Berilgan IDga teng qabul topilmadi.")
    }

    res.send(enrollment);
})

module.exports = router;