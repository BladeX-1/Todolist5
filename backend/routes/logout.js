const { Router } = require("express");
router = Router();

router.post("/", async (req, res) => {
    res.clearCookie("login");
    return res.status(400).json({ msg: "logged out" });
});

module.exports = router;
