const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
    const loggedUsername = req.loggedUsername;

    const loggedUser = await prisma.user.findFirst({
        where: { username: req.loggedUsername },
    });

    allTasks = await prisma.task.findMany({
        where: { authorId: loggedUser.id },
    });

    console.log(allTasks);
    return res.status(200).json(allTasks);
});

router.get("/:id", async (req, res) => {
    const loggedUsername = req.loggedUsername;
    const id = Number(req.params.id);

    const loggedUser = await prisma.user.findFirst({
        where: { username: req.loggedUsername },
    });

    oneTask = await prisma.task.findFirst({
        where: { id, authorId: loggedUser.id },
    });

    console.log(oneTask);
    return res.status(200).json(oneTask);
});

router.post("/", async (req, res) => {
    const body = req.body?.body;
    const done = req.body?.done;

    console.log("post request", body, done);

    const loggedUser = await prisma.user.findFirst({
        where: { username: req.loggedUsername },
    });

    const newTask = await prisma.task.create({
        data: { body, done: Boolean(done), authorId: loggedUser.id },
    });
    return res.status(200).json({ body: newTask.body, done: newTask.done });
});

router.put("/:id", async (req, res) => {
    const body = req.body?.body;
    const done = req.body?.done;
    const id = Number(req.params.id);

    const loggedUser = await prisma.user.findFirst({
        where: { username: req.loggedUsername },
    });

    const newTask = await prisma.task.update({
        where: { id, authorId: loggedUser.id },
        data: { body, done: Boolean(done), authorId: loggedUser.id },
    });
    return res
        .status(200)
        .json({ msg: "updated", body: newTask.body, done: newTask.done });
});

router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    const loggedUser = await prisma.user.findFirst({
        where: { username: req.loggedUsername },
    });

    const deletedTask = await prisma.task.delete({
        where: { id, authorId: loggedUser.id },
    });
    return res.status(200).json({ msg: "deleted", body: deletedTask.body });
});

module.exports = router;
