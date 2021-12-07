const express = require('express');
const app = express();
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const mongoose = require('mongoose');
// Promise qaytaradi 
mongoose.connect('mongodb://localhost/virtualdars')
    .then(() => {
        console.log('MongoDBga ulanish amalga oshirildi...')
    })
    .catch((err) => {
        console.error("MongoDB ga ulanishda xatolik yuz berdi...",err)
    });

app.use(express.json());

app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);

app.get('/', (req, res) => {
    res.status(200).send('Endi boshladik...')
})
const port = process.env.PORT || 8000;

app.listen(port, ()  => {
    console.log(`${port} - portni eshitishni boshladim...`)
});