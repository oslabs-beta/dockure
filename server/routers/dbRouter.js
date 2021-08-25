const express = require('express');
const dbController = require('../server/controllers/dbController');
//confirm that db controller file path is correct on line above 

const router = express.Router();

//route handler

router.get('/',
dbController.createTable,
(req, res) => {
    return res.status(200).json('Database initialized')
});

module.exports = ;
// what should I be exporting here ?