const express = require('express');
const router = express.Router();
const { Category, validate } = require('../models/category');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')
//Route model
// localhost 8000 127.0.0.1 

router.get('/', async (req, res) => {
    throw new Error("serverda nosozlik");
    const categories = await Category.find().sort('name');
    res.send(categories);
});

router.get('/:id', async (req, res) => {
    let category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).send("Berilgan Id dagi mashg'ulot turi topilmadi...")
    }
    res.send(category);
});

router.post('/', auth, async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
    }

    let category = new Category({
        name: req.body.name
    });

    category = await category.save();
    res.status(201).send(category);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!category) {
        return res.status(404).send("Berilgan Idga teng bo'lgan element topilmadi...");
    }
    res.send(category);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
        return res.status(404).send("Berilgan Id dagi element topilmadi...");
    };
    res.send(category);
});

module.exports = router;