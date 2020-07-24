const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy
const users = require('../models/users')
const user_model = require('../user_model')
const process = require('process')

const User = mongoose.model('Users')
//const FinAUsers = mongoose.model('FinAUsers')
//const DonorUsers = mongoose.model('DonorUsers')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        console.log("User: "+user)
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findByIdAndUpdate(id, (err, user) => {
            console.log("error: " + err)
            console.log("User: "+user)
            done(err, user)
        })
    })
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
        (req,email, password, done) => {
        //process.nextTick( () => {
        console.log("helloo????")
                console.log("email: "+email)
                console.log("password: "+password)
                //console.log("firstName: " + req.body.firstName)
                user_model.findOne({email: email}, (err, user) => {
                    if (err) {
                        console.log("where in the errors")
                        return done(err)
                    }
                    if (user) {
                        console.log("where saying a user exists :P")
                        return done(null, false, {'signupMessage': 'That email is already in use'})
                    }
                    else {
                        console.log("we're making new users!")
                        let newUser = new User();

                        newUser.firstName = req.body.firstName
                        newUser.lastName = req.body.lastName
                        console.log("new user obj made")
                        newUser.email = email
                        console.log("set the email...")
                        newUser.password = newUser.setPassword(password)
                        console.log("set the password: " + newUser.password)
                        newUser.accountType = req.body.accountType
                        newUser.token = newUser.generateJWT()

                        console.log(newUser)
                        let finalUser = new user_model(newUser)
                        console.log(finalUser)
                        finalUser.save((err) => {
                            console.log("where checking for errors")
                            if (err)
                                throw err
                            console.log("we made it!")
                            return done(null, finalUser)
                        })
                    }
                } )

        }))
}
passport.use('local-login',new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        user_model.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            let loginUser = new User()
            loginUser.email = email
            console.log(loginUser.email)
            loginUser.firstName = user.firstName
            loginUser.lastName = user.lastName
            loginUser.accountType = user.accountType
            if (!loginUser.validatePassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
