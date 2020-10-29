const router = require('express').Router();
const func = require('../lab1/func')

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/login');
    }
};


router.get('/task1',(req,res,next)=>{
    if (req.query.str == undefined)
        res.render('task',{
            title: "Task 1",
            task1: true,
            description: 'Каждое слово начинается с заглавной буквы',
            example: ["hello 312hds jo321pa", 'Hello Hds Jopa']
        })
    else {
        res.render('task',{
            title: "Task 1",
            description: 'Каждое слово начинается с заглавной буквы',
            example: ["hello 312hds jo321pa", 'Hello Hds Jopa'],
            answer: func.upper(req.query.str)
        })
    }
})


router.get('/task2',auth, (req,res,next)=>{
    if (req.query.str == undefined)
        res.render('task',{
            title: "Task 2",
            task2: true,
            description: 'Ищет первый неповторяющийся символ',
            example: ["boopbs", 'p']
        })
    else {
        res.render('task',{
            title: "Task 2",
            description: 'Каждое слово начинается с заглавной буквы',
            example: ["hello 312hds jo321pa", 'Hello Hds Jopa'],
            answer: func.findFirst(req.query.str)
        })
    }
})


router.get('/task3',auth, (req,res,next)=>{
    if (req.query.num == undefined || req.query.raz == undefined)
        res.render('task',{
            title: "Task 2",
            task3: true,
            description: 'Меняет число знаков после запятой',
            example: ["13.424  2", '13.42']
        })
    else {
        res.render('task',{
            title: "Task 3",
            description: 'Меняет число знаков после запятой',
            example: ["13.424  2", '13.42'],
            answer: func.format(req.query.num, req.query.raz)
        })
    }
})

module.exports = router;