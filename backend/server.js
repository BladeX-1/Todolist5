const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
// const { PrismaClient } = require("./generated/prisma");
const { PrismaClient } = require("@prisma/client");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const tasksRouter = require("./routes/tasks");
const authorize = require("./middleware/authorize");

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use(authorize);
app.use("/tasks", tasksRouter);

app.listen(3000, () => {
    console.log(`app active on port ${3000}`);
});
