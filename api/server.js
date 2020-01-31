const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("express").Router();

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const jokesRouter = require("../jokes/jokes-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", authenticate, jokesRouter);
server.use("/api/users", authenticate, usersRouter);

server.get("/", (req, res) => {
  res.json({ message: "Sprint Challenge api is working!!!" });
});

module.exports = server;
