const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router = Router();

router.post("/", async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;

    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "username and password are required" });
    }

    const foundUser = await prisma.user.findFirst({ where: { username } });
    if (!foundUser) {
        return res.status(400).json({ msg: "username not found" });
    }

    if (!(await bcrypt.compare(password, foundUser.password))) {
        return res.status(400).json({ msg: "invalid password" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.cookie("login", token);
    res.status(400).json({ msg: "logged in" });
});

module.exports = router;
