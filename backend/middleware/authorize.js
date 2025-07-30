const jwt = require("jsonwebtoken");

function authorise(req, res, next) {
    const loginToken = req.cookies?.login;
    jwt.verify(loginToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ msg: "error authorizing" });
        }
        req.loggedUsername = decoded.username;
        return next();
    });
}

module.exports = authorise;
