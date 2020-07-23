const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http').Server(app)
const session = require('express-session')
const io = require('socket.io')(http)
const jwt = require('jsonwebtoken')
const users = require("./.lib/models/users")
const userdb = require('./.lib/user_model')
//const FinAdb = require('./.lib/user_financial_advisor_model')
//const Donordb = require('./.lib/donor_model')
const passport = require('passport')
require('./.lib/config/passport')(passport)
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const flash = require('connect-flash')


const authPath = require('./.lib/routes/auth')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

/*app.use((req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept")
	next()
})*/

app.use(session({secret: 'midas-touch'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

let auth = express.Router();
app.use('/auth',auth)
require('./.lib/routes/routes')(app, auth,passport)
app.use(express.static(__dirname))
app.set('view engine', 'ejs')


const server = http.listen('8080', () => {
    console.log('listening on: ', server.address().port)
})


io.on('connection', (socket) => {
    const session = socket.request.session
    session.connections++
    session.save()
	console.log('user connected');
});


