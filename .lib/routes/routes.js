const users = require('../models/users')
module.exports = (app,auth, passport) =>
{

    auth.get('/signin', async (req, res) => {
        try {
            console.log()
        } catch {
            res.sendStatus(500)
        } finally {
            console.log('we did it!')
        }
    })

    let checkAuthenticated = (req, res, next) => {
        if (!req.header('Authorization'))
            return res.status(401).send({message: 'Unauthorized request. missing authentication header'})
        let token = req.header('Authorization').split(' ')[1]
    }

    app.post('/st_register', passport.authenticate('local-signup', {
        successRedirect: '/st_dashboard', // redirect to the secure profile section
        failureRedirect: '/register.html', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    //app.post('/st_register', passport.authenticate('local-signup'), (req, res) => {
      //  console.log(res.json)
        //res.json(req.body)
    //});
    app.get('/st_dashboard', isLoggedIn,(req, res) => {
        console.log("trying to render this")
        res.render('st_dashboard')
    })

    /*auth.post('/ad_register', authPath.optional, (req, res, next) => {
        const advisorUser = req.body;
        console.log(advisorUser);
        if (!advisorUser.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }
        if (!advisorUser.password) {
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
        res.json({user: finalUser.toAuthJSON()});
    });

//POST login route (optional, everyone has access)
    auth.post('/login', authPath.optional, (req, res, next) => {
        const user = req.body;
        console.log(user);
        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }
        //console.log(user.password);
        if (!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }
        console.log("we are going in");
        return passport.authenticate('local', {session: false}, (err, user, info) => {
            console.log('We\'re in!');
            if (err) {
                return console.log(err);
            }
            console.log('passed the errors');
            if (user) {
                console.log(user);
                const userPassort = user;
                userPassort.token = user.generateJWT();
                console.log('you did it!');
                io.emit('user', userPassort.username);
                return res.json({user: userPassort.toAuthJSON()});
            }
            return res.sendStatus(400).info;
        })(req, res, next);
    });*/
//GET current route (required, only authenticated users have access)
    auth.get('/current', isLoggedIn, (req, res, next) => {
        const id = req.body;
        console.log(id.user._id);
        console.log('Checking auth...');
        authdb.findOne(id.user._id, (err, user) => {
            if (user) {
                console.log('didn\'t work :( ');
                return res.sendStatus(400);
            }
            console.log('it worked! We made it!!');
            return res.json({user: Users(user).toAuthJSON()});
        });
    });
}
let isLoggedIn = (req, res, next) => {
    console.log("looking to see if we can authenticate")
    if (req.isAuthenticated()) {
        console.log("we're in the if is authenticated check")
        return next()
    }

    res.redirect('/index.html')
}
