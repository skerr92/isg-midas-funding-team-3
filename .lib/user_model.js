const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let userInstance = new mongoose()

const db = 'mongodb+srv://admin:admin@cluster0.bnq3j.mongodb.net/Users?retryWrites=true&w=majority'

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
    console.log('Mongo DB Basic User connected', err)
})

module.exports = Users