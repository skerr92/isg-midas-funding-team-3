const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let messageInstance = new mongoose()

const db = 'mongodb+srv://<user>:<pass>@cluster0.bnq3j.mongodb.net/messages?retryWrites=true&w=majority'

messageInstance.Promise

let message = messageInstance.model('Messages', {
    name: String,
    message: String
})

messageInstance.connect(db, { useNewUrlParser: true} , (err) => {
    console.log('Mongo DB message db connected', err)
})

module.exports = message
