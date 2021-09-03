const { Router } = require('express');
const userController = require('../controllers/userController.js');
const isAuth = require('../controllers/isAuth');
//confirm that db controller file path is correct on line above

const userRouter = Router();

//route handler

userRouter.post('/signup', userController.createUser, (req, res) => {
  res.status(200).send({ id: res.locals.id, token: res.locals.token });
});

userRouter.post('/login', userController.userLogin, (req, res) => {
  res.status(200).send({ id: res.locals.id, token: res.locals.token });
});

userRouter.get('/me', isAuth, userController.me, (req, res) => {
  res.status(200).send({ id: res.locals.id, token: res.locals.token });
});

// router.post('/logout',
// dbController.logout,
// (req, res) => {
//     return res.status(200).redirect('/')
// });

// get info of user

// update user information

module.exports = userRouter;
