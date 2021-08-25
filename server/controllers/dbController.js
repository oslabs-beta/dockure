const db = require('../models/dockureModel');

const dbController = {};

dbController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
    if(!username || !password)
     return next({
      status: 401,
      errMessage: "invalid username or password", 
    });
     
    let hashedPassword;
    try {
          const salt = bcrypt.genSaltSync(10);
          hashedPassword = bcrypt.hashSync(password, salt);
        } catch (err) {
          return next({ status: 500, message: err.message, message2: 'password error' });
        }

        
        
        try {
          const params = [username, hashedPassword];
          const query = `INSERT INTO user (userid ,username, password) VALUES ($1, $2) RETURNING userid` ;
          const { rows } = await pool.query(query, params);
          res.locals.userid = rows[0].userid;
        } catch (err) {
        return next({
          status: 500,
          message:"Username already exists",
        });
      }
      return next();
    }; //
      
      
      dbController.userLogin = async (req, res, next) => {
      const { username, password } = req.body;
      if (!username || !password)
          return next(new Error("Please enter username and password"));

          let user;
          try{
            const query = `SELECT * FROM user WHERE username=$1`;
            const params = [username];
            const { rows } = await pool.query(query, params);
            if(rows.length < 1){
              return next({
                status: 401,
                message: "Invalid username and password"
              });
              user = rows[0];
            }
          } catch(err){
            return next({
              status: 500,
              message: err.message,
            });
          }
          const compared = await bcrypt.compare(password, user.password);
          if (!compared)
            return next({
            status: 401,
            message: "That username and password is not valid.",
           });
           res.locals.userid = user.userid;
           return next();
      }; //



      module.exports = dbController;

 
