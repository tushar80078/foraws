const bcrypt = require("bcrypt");
const { getUserByUserEmailId } = require("../db/UserDB");

const checkPasswordMiddleware = (req, res, next) => {
  getUserByUserEmailId(req.body.email).then(data => {
    if (data) {
    
      bcrypt.compare(req.body.password, data.password, function(err, result) {
        if (!result) {
          next(new Error("Password Is Wrong"));
        } else {
          req.body.data = data;
          next();
        }
      });
    } else {
      next(new Error("User Not Found"));
    }  
  });
};

module.exports = checkPasswordMiddleware;
