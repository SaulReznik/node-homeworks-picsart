const express = require("express");
const usersRouter = express.Router();

const helpers = require("../helpers");

usersRouter.use(express.json());

async function getUser(req, res, next) {
  try {
    const users = await helpers.getUsers("./db.json");

    return res.status(200).send(users[req.body.username]);
  } catch (err) {
    console.log("Get User Error ---->", err);
  }
}

async function updateUser(req, res) {
  try {
    const users = await helpers.getUsers("./db.json");

    if (req.body.username in users) {
      delete users[req.body.username];

      users[req.body.username] = req.body;
      return res.status(200).send(users[req.body.username]);
    }
    return res.status(400).send("User with the given username is not found");
  } catch (err) {
    console.log("Get User Error ---->", err);
  }
}

usersRouter.get("/users", getUser).put("/users", updateUser);

module.exports = usersRouter;
