const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const authdb = require('../auth.db')
const users = require('../models/users')

const Users = mongoose.model('Users')
const FinAUsers = mongoose.model('FinAUsers')
const DonorUsers = mongoose.model('DonorUsers')

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    console.log("starting authentication")
    Users.findOne( {email} )
        .then((user) => {
            console.log("checking for user...")
            if(!Users(user) || !Users(user).validatePassword(password)) {
                return done(null, false, {errors: {'email or password' : 'is invalid'}})
            }

            return done(null, Users(user))
        }).catch(done)
}))