const jwt = require("jsonwebtoken");

function authorise(req, res, next) {
    const loginToken = req.cookies?.login;
    try {
        verifiedToken = jwt.verify(loginToken, process.env.JWT_SECRET);
        req.loggedUsername = verifiedToken.username;
        return next();
    } catch (err) {
        return res.status(400).json({ msg: "error authorizing" });
    }
}

module.exports = authorise;
