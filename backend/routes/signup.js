const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;

    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "username and password cannot be empty" });
    }
    const alreadyUser = await prisma.user.findFirst({ where: { username } });
    if (alreadyUser) {
        return res.status(400).json({ msg: "username already taken" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: { username, password: hashedpassword },
    });
    return res.status(200).json({ msg: "user created successfully", username });
});

module.exports = router;
