const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try {
        const encode = req.headers.authorization;
        const arr = encode.split(" ");
        const tkn = arr[1];

        const decoded = jwt.verify(tkn, JWT_SECRET);
        if (decoded.username){
            next();
        }
        else {
            res.status(403).json({
                msg: "Not Authorized!"
            })
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error!")
    }
}

module.exports = userMiddleware;