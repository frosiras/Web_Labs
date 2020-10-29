const express = require('express')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../models/User')
const router = require('express').Router();

router.get("/",(req,res)=>{
    res.render('home',{
        title: 'Home Page',
    })
})

router.get('/login', (req,res)=>{
    res.render('login',{
        title: 'Login'
    })
})

router.post('/login', passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login'})
)

router.get('/register',(req,res)=>{
    res.render('register', {
        title: 'Register'
    })
})
router.post('/register',async (req,res, next)=>{
    console.log(req.body.username + req.body.password)
    const candidate = await User.findOne({email: req.body.username})
    // Если такая почта уже есть
    if (candidate) {
        console.log('Почта уже существует')
        res.status(409).render('register', {
            title: "Register",
            message: "Такая почта уже зарегистрирована",
            error: true
        })
    } else {
        console.log('Создаем пароль')
        const salt = await bcrypt.genSaltSync(10)
        const password = req.body.password
        console.log(password)
        const user = new User({
            email: req.body.username,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            console.log('сохраняем юзера')
            await user.save()
            res.status(201).render('home', {
                title: "Success!",
                message: "Вы были успешно зарегистрированы",
                success: true
            })
        } catch (e){
            console.log(e)
            next(new Error('500'))
        }
    }
})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/login')
})

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/login');
    }
};
module.exports = router;