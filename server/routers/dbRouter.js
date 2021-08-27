const express = require('express');
const dbController = require('../controllers/dbController.js');
//confirm that db controller file path is correct on line above 

const dbRouter = express.Router();

//route handler

dbRouter.post('/signup',dbController.createUser,(req, res) => {
    return res.sendStatus(200).send({userid: res.locals.userid});
});

dbRouter.post('/login', dbController.userLogin, (req,res) => {
    return res.status(200).send({userid: res.locals.userid});
});

// router.post('/logout',
// dbController.logout,
// (req, res) => {
//     return res.status(200).redirect('/')
// });

module.exports = dbRouter;

