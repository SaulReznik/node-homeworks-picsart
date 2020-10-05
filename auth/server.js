const crypto = require("crypto");

const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const users = [];

app.post("/users/signup", (req, res) => {
  if (!req.body.password || req.body.password.length < 8) {
    res.status(400).end("Please provide valid password");
  }

  if (!req.body.username || req.body.username.length < 3) {
    res.status(400).end("Please provide valid username");
  }

  const cryptedPass = Buffer.from(req.body.password).toString("base64");

  const user = {
    ...req.body,
    id: crypto.randomBytes(16).toString("hex"),
    password: cryptedPass
  };

  users.push(user);

  res.status(200).end("done");
});

app.post("/users/signin", (req, res) => {
  users.forEach(user => {
    if (user.username === req.body.username) {
      const encryptedPass = Buffer.from(user.password, "base64").toString();

      if (encryptedPass === req.body.password) {
        res.status(200).end(JSON.stringify(users));
      }

      res.status(200).end("The password for this user is not correct");
    }
  });

  res.status(404).end("Sorry pal, user is not found");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
