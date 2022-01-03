require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const authenticateToken = require("./src/jwt");
const updateCookies = require("./src/updateCookies");

const tasklist = require("./routes/tasklist");
const task = require("./routes/task");
const board = require("./routes/board");
const detail = require("./routes/detail");
const user = require("./routes/user");
const signup = require("./routes/signUp");
const login = require("./routes/login");
const logout = require("./routes/logout");

const PORT = 8000;

const corsOptions = {
  origin : process.env.ORIGIN || "http://localhost:3000",
  credentials : true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", authenticateToken, logout)
app.use("/tasklist", authenticateToken, updateCookies, tasklist);
app.use("/task", authenticateToken, updateCookies, task);
app.use("/board", authenticateToken, updateCookies, board);
app.use("/detail", authenticateToken, updateCookies, detail);
app.use("/user", authenticateToken, user);

app.listen(PORT,
           () => { console.log(`Task management app listening at ${PORT}`); });
