const { Router } = require('express');
const conController = require('../controllers/dContainer.js');
const userController = require('../controllers/userController.js');
const isAuth = require('../controllers/isAuth');


const userRouter = Router();

//route handler
userRouter.post('/signup', userController.createUser, (req, res) => {
  res.status(200).send({ id: res.locals.id, token: res.locals.token });
});

userRouter.post('/login', 
  userController.userLogin, 
  (req, res) => {
    res.status(200).send({
      id: res.locals.id,
      token: res.locals.token,
    });
});

userRouter.get('/me', isAuth, userController.me,   
  (req, res) => {
    res
      .status(200)
      .send({
        id: res.locals.id,
        token: res.locals.token,
        username: res.locals.username,
      })
});

userRouter.get('/checkme', isAuth, userController.me, (req, res) => {
  res
    .status(200)
    .send({
      id: res.locals.id,
      token: res.locals.token,
      username: res.locals.username,
    });
  });

module.exports = userRouter;
