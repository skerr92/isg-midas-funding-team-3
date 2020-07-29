const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let literacyInstance = new mongoose()

const db = 'mongodb+srv://admin:admin@cluster0.bnq3j.mongodb.net/DonorUsers?retryWrites=true&w=majority'

literacyInstance.Promise

let LiteracyUsers = literacyInstance.model('Donors', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String,
    budget: Number,
    token: String,
})

literacyInstance.connect(db, { useNewUrlParser: true} , (err) => {
    console.log('Mongo DB Financial Literacy User connected', err)
})

module.exports = LiteracyUsers