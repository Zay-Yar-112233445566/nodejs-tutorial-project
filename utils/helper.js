
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fMsg = async (res, msg = "Success", result = []) => {
    res.status(200).json({
        con: true,
        msg,
        result
    })
}

module.exports = {
    encode: password => bcrypt.hashSync(password),
    comparePassword: (plain, hash) => bcrypt.compareSync(plain, hash),
    generateToken : (payLoad) =>jwt.sign(payLoad,process.env.SECRETE_KEY,{expiresIn:"1h"}),
    fMsg
}