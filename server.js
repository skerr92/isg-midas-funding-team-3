const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http').Server(app)
const session = require('express-session')
const io = require('socket.io')(http)
const jwt = require('jsonwebtoken')
const userdb = require('./.lib/user_model')
const FinAdb = require('./.lib/user_financial_advisor_model')
const Donordb = require('./.lib/donor_model')

const authPath = require('./.lib/routes/auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept")
	next()
})
let auth = express.Router();

app.use(express.static(__dirname))
app.set('view engine', 'ejs')

auth.get('/signin', async (req,res) => {
	try {
		console.log()
	} catch {
		res.sendStatus(500)
	} finally {
		console.log('we did it!')
	}
})

auth.post('/register', async (req,res) => {

})

auth.post('')

const server = http.listen('8080', () => {
	console.log('listening on: ', server.address().port)
})

app.use('/auth', auth)

let checkAuthenticated = (req, res, next) => {
	if(!req.header('Authorization'))
		return res.status(401).send({message: 'Unauthorized request. missing authentication header'})
	let token = req.header('Authorization').split(' ')[1]
}

auth.post('/st_register', authPath.optional, (req, res, next) => {
    const user = req.body;
    console.log(user);
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    const finalUser = new Users(user);
    finalUser.setPassword(user.password);
    console.log('We Made It!');
    let savedUser = authdb(finalUser);
    let finalSave = savedUser.save();
    res.json({ user: finalUser.toAuthJSON() });
});

auth.post('/ad_register', authPath.optional, (req, res, next) => {
    const advisorUser = req.body;
    console.log(advisorUser);
    if(!advisorUser.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    if(!advisorUser.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    const finalUser = new FinAUsers(advisorUser);
    finalUser.setPassword(advisorUser.password);
    console.log('We Made It!');
    let savedUser = authdb(finalUser);
    let finalSave = savedUser.save();
    res.json({ user: finalUser.toAuthJSON() });
});

//POST login route (optional, everyone has access)
auth.post('/login', authPath.optional, (req, res, next) => {
    const user = req.body;
    console.log(user);
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }
    //console.log(user.password);
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }
    console.log("we are going in");
    return passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('We\'re in!');
        if(err) {
            return console.log(err);
        }
        console.log('passed the errors');
        if(user) {
            console.log(user);
            const userPassort = user;
            userPassort.token = user.generateJWT();
            console.log('you did it!');
            io.emit('user', userPassort.username);
            return res.json({ user: userPassort.toAuthJSON() });
        }
        return res.sendStatus(400).info;
    })(req, res, next);
});
//GET current route (required, only authenticated users have access)
auth.get('/current', authPath.required, (req, res, next) => {
    const id = req.body;
    console.log(id.user._id);
    console.log('Checking auth...');
    authdb.findOne(id.user._id, (err, user) => {
        if(user) {
            console.log('didn\'t work :( ');
            return res.sendStatus(400);
        }
        console.log('it worked! We made it!!');
        return res.json({ user: Users(user).toAuthJSON() });
    });
});



io.on('connection', (socket) => {
    const session = socket.request.session
    session.connections++
    session.save()
	console.log('user connected');
});


