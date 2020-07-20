import * as model from "mongoose";

const emailValidator = require('email-validator')

let advisorInstance = new mongoose()
const db = ''

let FinancialAdvisors = advisorInstance.model('FinancialAdvisors', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String,
    token: String,
    license: String
})

if (FinancialAdvisors.license) {
    advisorInstance.connect(db, {useNewUrlParser: true}, (err) => {
        console.log('Mongo DB Financial Advisor User connected', err)
    })
}

module.exports = FinancialAdvisors