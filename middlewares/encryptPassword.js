const bcrypt = require("bcrypt");

const encryptPasswordMiddlewar = (req, res, next) => {

    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        req.body.password = hash;
        next();
    });

}

module.exports = encryptPasswordMiddlewar;