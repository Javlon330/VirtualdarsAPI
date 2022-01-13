require('express-async-errors');
const express = require('express');
const app = express();
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursesRoute = require('./routes/courses');
const enrollmentsRoute = require('./routes/enrollments');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const errorMiddleware = require('./middleware/error')
const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
require('winston-mongodb')

winston.add(new winston.transports.Console({}))
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/virtualdars-logs', level: 'warn'}))
winston.add(new winston.transports.File({filename: 'logs/vd-logs.log'}));

if(!config.get("jwtPrivateKey")) {
    winston.error("Jiddiy Xato: vituraldars_jwtPrivateKey aniqlanmadi")
    process.exit(1);
}
mongoose.connect('mongodb://localhost/virtualdars')
    .then(() => {
        winston.debug('MongoDBga ulanish amalga oshirildi...')
    })
    .catch((err) => {
        winston.error("MongoDB ga ulanishda xatolik yuz berdi...",err)
    });

app.use(express.json());

app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/enrollments', enrollmentsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use(errorMiddleware);

app.get('/', (req, res) => {
   
    res.status(200).send('Endi boshladik...')
});

const port = process.env.PORT || 8000;

app.listen(port, ()  => {
    winston.info(`${port} - portni eshitishni boshladim...`)
});