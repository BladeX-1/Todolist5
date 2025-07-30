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

let whitelist = ["http://localhost:5173", "http://localhost:3000"];
let corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//     res.header("Access-Control-Allow-Credentials", true);

//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept,X-Auth-Token"
//     );
//     next();
// });

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use(authorize);
app.use("/tasks", tasksRouter);

app.listen(3000, () => {
    console.log(`app active on port ${3000}`);
});
