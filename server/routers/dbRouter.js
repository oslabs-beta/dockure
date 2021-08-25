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

router.post('/logout',
dbController.logout,
(req, res) => {
    return res.status(200).redirect('/')
});

module.exports = router;


// userRouter.post(
//     "/signup",
//     userController.createUser,
//     cookieController.setCookies,
//     (_req, res) => {
//       res.status(200).send({ id: res.locals.id });
//     }
//   );
  
//   userRouter.post(
//     "/login",
//     userController.loginUser,
//     cookieController.setCookies,
//     (_req, res) => {
//       res.status(200).send({ id: res.locals.id });
//     }
//   );
// 
//   // Eliminates cookie and sends user back to home page.
//   userRouter.post(
//     "/logout",
//     cookieController.unsetCookies,
//     questionController.setInactive,
//     (_req, res) => {
//       res.status(200).redirect("/");
//     }
//   );
  