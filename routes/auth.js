const express = require('express');
const { User } = require('../models/user');
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt')

// pick metodid foydalanmiz
const router = express.Router();

router.post('/', async (req, res) => {
    const {error}  = validate(req.body);
    if(error) { 
        res.status(400).send(error.details[0].message)
    }

    let user = await  User.findOne({ email: req.body.email});
    if(!user) { 
        return res.status(400).send('Email yoki parol notogri');
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword){
        return res.status(400).send('Email yoki parol notogri');
    };

    const token = user.generatorToken();
    
    res.header('x-auth-token',token).send(true)
});

function validate(req){
    const schema = {
        email: Joi.string().required().min(8).max(50).email(),
        password: Joi.string().required().min(6).max(255) //regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/)
    };
    return Joi.object(schema).validate(req, schema);
}

module.exports = router;