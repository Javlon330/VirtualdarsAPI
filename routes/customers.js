const express = require('express');
const router = express.Router();
const { Customer, validate} = require('../models/customer');


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers);
});

router.post('/', async (req, res) => {
    // object  destructuring
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    };
    let customer = new Customer({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone,
        bonusPoints: req.body.bonusPoints
    });

    customer = await customer.save();
    res.status(201).send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send('Bunday idga ega mijoz topilmadi...')
    };
    res.send(customer);
});

router.put('/:id', async (req, res) => {

    const { error } = validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
    }

    let customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    }, { new: true });

    if (!customer) {
        return res.status(404).send("Bunday id ga ega mijoz topilmadi...")
    };

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) {
        res.status(404).send("Bunday id ga ega mijoz topilmadi...")
    };
    res.send(customer);
});


module.exports = router;