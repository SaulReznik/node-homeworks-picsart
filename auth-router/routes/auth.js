const fs = require("fs");
const crypto = require("crypto");

const express = require("express");
const jwt = require("jsonwebtoken");

const helpers = require("../helpers");

const authRouter = express.Router();
const accessTokenSecret = "4-8-15-16-23-42";

async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    const users = await helpers.getUsers("./db.json");

    if (
      users[username] &&
      Buffer.from(users[username].password, "base64").toString() === password
    ) {
      const accessToken = jwt.sign(
        {
          username: username
        },
        accessTokenSecret
      );

      res.json({
        accessToken
      });
    } else {
      return res.send("Username or password incorrect");
    }
  } catch (err) {
    console.log("Sign in error --->", err);
  }
}

async function signUp(req, res) {
  try {
    const users = await helpers.getUsers("./db.json");
    console.log(users);
    if (!req.body.password || req.body.password.length < 8) {
      return res.status(400).send("Please provide valid password");
    }

    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send("Please provide valid username");
    }

    if (req.body.username in users) {
      return res
        .status(400)
        .send("User with the given username is already exists");
    }

    //UGLY: Simple crypting the password using base64
    const cryptedPass = Buffer.from(req.body.password).toString("base64");

    //Creating proper user object
    const user = {
      ...req.body,
      id: crypto.randomBytes(16).toString("hex"),
      password: cryptedPass
    };

    await helpers.addUserToDB("./db.json", user);
  } catch (err) {
    console.log("server error", err);
    return res.status(500).send(err);
  }
}

authRouter.post("/signin", signIn).post("/signup", signUp);

module.exports = authRouter;
