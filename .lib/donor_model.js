const mongoose = require('mongoose').Mongoose
const emailValidator = require('email-validator')

let donorInstance = new mongoose()

const db = 'mongodb+srv://admin:admin@cluster0.bnq3j.mongodb.net/DonorUsers?retryWrites=true&w=majority'

donorInstance.Promise

let DonorUsers = donorInstance.model('Donors', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String,
    token: String,
    donorStatus: String,
    recentDonation: String,
    allTimeDonations: String,
    donorPoints: Number
})

donorInstance.connect(db, { useNewUrlParser: true} , (err) => {
    console.log('Mongo DB Donor User connected', err)
})

module.exports = DonorUsers

