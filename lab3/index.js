const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const User = require("./models/User")
const bCrypt = require('bcryptjs')
const app = express();
const passport = require('passport')
const session = require("express-session")
const FileStore = require('session-file-store')(session);
const auth = require('./routes/auth')
const tasks = require('./routes/tasks')
const bodyParser = require("body-parser");
const LocalStrategy = require('passport-local').Strategy;


app.set("view engine", "pug");
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    async function(username, password, done) {
        console.log('it started')

        await User.findOne({ email: username }, async function(err, user) {
            console.log('user found')
            if (err) {
                console.log('it doesnt work');
                return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!bCrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log(password)
            console.log('it works!')
            return done(null, user);
        });
    }
));
app.use(express.static("public"));
app.use(cookieParser('hello'));
app.use(session({
    store: new FileStore(),
    cookie: {
        maxAge: 36000 * 1000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
async function init() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin@bob.llowb.mongodb.net/Bob'
        )
        console.log('Database works!')

    } catch (e){
        console.log(e);
    }
}

init();
app.use(auth);
app.use(tasks);
app.listen(3000);
