const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let userInstance = new mongoose()

const db = ''

userInstance.Promise

let Users = userInstance.model('Users', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String,
    token: String
})

userInstance.connect(db, { useNewUrlParser: true} , (err) => {
    console.log('Mongo DB User connected', err)
})

module.exports = Users