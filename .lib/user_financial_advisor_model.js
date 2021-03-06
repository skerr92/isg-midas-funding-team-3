const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let advisorInstance = new mongoose()
const db = 'mongodb+srv://<user>:<pass>@cluster0.bnq3j.mongodb.net/FinAUsers?retryWrites=true&w=majority'

let FinAUsers = advisorInstance.model('FinancialAdvisors', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String,
    token: String,
    license: String
})

if (FinAUsers.license) {
    advisorInstance.connect(db, {useNewUrlParser: true}, (err) => {
        console.log('Mongo DB Financial Advisor User connected', err)
    })
}

advisorInstance.connect(db, {useNewUrlParser: true}, (err) => {
    console.log('Mongo DB Financial Advisor User connected', err)
})

module.exports = FinAUsers
