const { Router } = require('express');
const userController = require('../controllers/userController.js');
//confirm that db controller file path is correct on line above

const userRouter = Router();

//route handler

userRouter.post('/signup', userController.createUser, (req, res) => {
  // { userid: res.locals.userid }
  res.status(200).send({ username: res.locals.username });
});

userRouter.post('/login', userController.userLogin, (req, res) => {
  // { userid: res.locals.userid }
  res.status(200).send();
});

// router.post('/logout',
// dbController.logout,
// (req, res) => {
//     return res.status(200).redirect('/')
// });

// get info of user 

// update user information



module.exports = userRouter;
