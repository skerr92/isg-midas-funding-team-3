const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let donorInstance = new mongoose()

const db = ''

donorInstance.Promise

let Donors = donorInstance.model('Donors', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    token: String,
})

donorInstance.connect(db, { useNewUrlParser: true} , (err) => {
    console.log('Mongo DB User connected', err)
})

module.exports = Donors
