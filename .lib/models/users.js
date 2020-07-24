const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    accountType: String,
    token: String
})

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(16), null);
};

// checking if password is valid
userSchema.methods.validatePassword = function(password) {
    //console.log("This is the local password: "+this.password)
    //console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(16),null))
    return bcrypt.compareSync(password,this.password);
};

/*userSchema.methods.setPassword = function(password) {
    console.log("did we make it here?")
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash
}

userSchema.methods.validatePassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    console.log("hashed: "+hash)
    console.log("what is this: "+this.hash)
    return this.hash === hash
}*/

userSchema.methods.generateJWT = function() {
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt((expirationDate.getTime() / 1000).toString(), 10)
    }, 'midas-touch')
}

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    }
}

mongoose.model('Users', userSchema, 'users')