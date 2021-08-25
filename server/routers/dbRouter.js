const express = require('express');
const dbController = require('../controllers/dbController.js');
//confirm that db controller file path is correct on line above 

const router = express.Router();

//route handler

router.post('/user',
dbController.,
(req, res) => {
    return res.status(200).json('Database initialized')
});

module.exports = router;