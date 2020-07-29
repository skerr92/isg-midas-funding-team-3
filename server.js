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
const db = require('./.lib/db')
const FinAdb = require('./.lib/user_financial_advisor_model')
const Donordb = require('./.lib/donor_model')
const Literacydb = require('./.lib/literacy_model')
const passport = require('passport')
//require('./.lib/config/passport')(passport)
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const flash = require('connect-flash')


const authPath = require('./.lib/routes/auth')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods","GET,HEAD,PUT,PATCH,POST,DELETE")
    res.header("Access-control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept")
    next()
})

app.get('/messages', (req, res) => {
    db.find({},(err, messages)=> {
        console.log(messages)
        console.log(messages[0].name)
        //io.emit('message', messages)
        res.status(200).send(messages);
    })
})


app.post('/messages', (req, res) => {
    let message = new db(req.body);
    message.save((err) =>{
        if(err)
            sendStatus(500);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

app.get('/users', (req, res) => {
    userdb.find({}, (err, users) => {
        res.status(200).send(users);
    });
});
//app.use(session({secret: 'midas-touch'}))
//app.use(passport.initialize())
//app.use(passport.session())
/*app.use((req, res, next) => {
    if(req.url.match('/st_register'))
        passport.session()(req,res,next)
    else if (req.url.match('/login'))
        passport.session()(req, res, next)
    else if (req.url.match('/st_dashboard'))
        passport.session()(req,res,next)
    else
        next()
})*/
app.use(flash())
app.use(cors())
let auth = express.Router();
app.use('/auth',auth)
//require('./.lib/routes/routes')(app, auth,passport)
app.use(express.static(__dirname))
app.set('view engine', 'ejs')


const server = http.listen('8080', () => {
    console.log('listening on: ', server.address().port)
})


io.on('connection', (socket) => {
    console.log("user connected")
});
auth.get('/st_register',(req, res) => {
    userdb.find({}, (err, users) => {
        res.send(users);
    })
});
auth.get('/login', checkAuthenticated, (req, res) => {
    userdb.find({}, (err, users) => {
        io.emit('user',users)
        res.send(users)
    })
})
app.get('/do_dashboard', (req,res) => {
    res.render('do_dashboard')
})

app.get('/fa_dashboard', (req,res) => {
    res.render('fa_dashboard')
})
app.get('/fl_dashboard', (req,res) => {
    res.render('fl_dashboard')
})

app.get('/user/me', checkAuthenticated, (req, res) => {
    res.json(userdb.find(req.name));
});

app.post('/user/me', checkAuthenticated, (req, res) => {

    let user = userdb.find({firstName: user, lastName: user});


    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    res.json(user);

});

auth.post('/login', async (req, res) => {
    let userL = req.body;
    //console.log(userL)
    userdb.find({email: userL.email}, (err,users) => {
        console.log("The user is: "+users[0]);
        console.log(JSON.stringify(users[0]).indexOf(userL.email));
        if(!users) {
            console.log("I threw a no users response");
            sendAuthError(res);
        }

        if(JSON.stringify(users[0]).search(userL.password)) {
            console.log(users[0])
            let loginName = userL.email;
            let accountType = users[0].accountType
            sendLoginToken(loginName,accountType,users, res);
            console.log("we did it! We logged in!")
        }
        else {
            console.log("I threw an invalid response...")
            console.log(users[0])
            sendAuthError(res)
        }

    });

})

auth.post('/st_register', async (req, res) => {
    try {

        let user = userdb(req.body);
        console.log(user)

        let savedUser = await user.save();
        loginName = user.email;
        console.log('saved');
        //io.emit('user', req.body);
        sendRegisterToken(loginName,user, res);
        //res.sendStatus(200)
    } catch (error) {
        //res.sendStatus(500);
        return console.error(error)
    } finally {
        console.log('User post called');
    }

});
auth.post('/do_register', async (req, res) => {
    try {

        let user = Donordb(req.body);
        console.log(user)

        let savedUser = await user.save();
        loginName = user.email;
        console.log('saved');
        //io.emit('user', req.body);
        sendRegisterToken(loginName,user, res);
        //res.sendStatus(200)
    } catch (error) {
        //res.sendStatus(500);
        return console.error(error)
    } finally {
        console.log('User post called');
    }

});
auth.post('/fa_register', async (req, res) => {
    try {

        let user = FinAdb(req.body);
        console.log(user)

        let savedUser = await user.save();
        loginName = user.email;
        console.log('saved');
        //io.emit('user', req.body);
        sendRegisterToken(loginName,user, res);
        //res.sendStatus(200)
    } catch (error) {
        //res.sendStatus(500);
        return console.error(error)
    } finally {
        console.log('User post called');
    }

});

auth.post('/fl_register', async (req, res) => {
    try {

        let user = Literacydb(req.body);
        console.log(user)

        let savedUser = await user.save();
        loginName = user.email;
        console.log('saved');
        //io.emit('user', req.body);
        sendRegisterToken(loginName,user, res);
        //res.sendStatus(200)
    } catch (error) {
        //res.sendStatus(500);
        return console.error(error)
    } finally {
        console.log('User post called');
    }

});

function sendLoginToken(loginUser,accountT, user, res) {
    let token = jwt.sign(user[0].id, '123');
    let account = accountT
    console.log(account)
    //io.emit('user',res.json({name: loginUser.name, token: token}));
    console.log(loginUser)
    io.emit('user',{name: loginUser, token, accountType: account})
    res.status(200).send({name: loginUser, token, accountType: account})
}
function sendRegisterToken(loginUser,user, res) {
    let token = jwt.sign(user.id, '123');
    let account = user.accountType
    //io.emit('user',res.json({name: loginUser.name, token: token}));
    console.log(loginUser)
    res.send({name: loginUser, token, accountType: account})
}

function sendAuthError(res) {
    //console.log("the response is" + res.stringify())
    return res.send({success: false, message: 'email or password incorrect'});
}

function checkAuthenticated(req, res, next) {
    if(!req.header('Authorization'))
        return res.status(401).send({message: 'Unauthorized request. Missing authentication header'});

    let token = req.header('Authorization').split(' ')[1];

    let payload = jwt.decode(token, '123');

    if(!payload)
        return res.status(401).send({message: 'Unauthorized request. Authentication header invalid'});

    req.user = payload;

    next();
}


