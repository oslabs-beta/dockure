const express = require('express');
const dbController = require('../controllers/dbController.js');
//confirm that db controller file path is correct on line above 

const router = express.Router();

//route handler

router.post('/signup',
dbController.createUser,
(req, res) => {
    return res.status(200).send({userid: res.locals.userid});
});

router.post('/login',
dbController.userLogin,
(req,res) => {
    return res.status(200).send({userid: res.locals.userid});
});

// router.post('/logout',
// dbController.logout,
// (req, res) => {
//     return res.status(200).redirect('/')
// });

module.exports = router;


