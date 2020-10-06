const crypto = require("crypto");
const fs = require("fs");
const util = require("util");

const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

//Promisifying necessary async functions
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const app = express();
const port = process.env.PORT || 3000;

//Middleware for express to recognize incoming JSON (instead of body parser)
app.use(express.json());

app.post("/users/signup", async (req, res) => {
  try {
    //Simple validation
    if (!req.body.password || req.body.password.length < 8) {
      res.status(400).send("Please provide valid password");
    }

    if (!req.body.username || req.body.username.length < 3) {
      res.status(400).send("Please provide valid username");
    }

    //UGLY: Simple crypting the password using base64
    const cryptedPass = Buffer.from(req.body.password).toString("base64");

    //Creating proper user object
    const user = {
      ...req.body,
      id: crypto.randomBytes(16).toString("hex"),
      password: cryptedPass
    };

    //Getting users from db, adding our user and sending back to db
    const users = JSON.parse(await readFile("./db.json", "utf8"));

    users.push(user);

    const jsoned = JSON.stringify(users);

    await writeFile("./db.json", jsoned);

    res.status(200).send("done");
  } catch (err) {
    res.status(500).send("Sorry kiddo, something wrong in the server");
  }
});

app.post("/users/signin", async (req, res) => {
  try {
    const users = JSON.parse(await readFile("./db.json", "utf8"));

    users.forEach(user => {
      if (user.username === req.body.username) {
        const encryptedPass = Buffer.from(user.password, "base64").toString();

        if (encryptedPass === req.body.password) {
          res.status(200).send(JSON.stringify(users));
        }

        res.status(200).send("The password for this user is not correct");
      }
    });

    res.status(404).send("Sorry pal, user is not found");
  } catch (err) {
    res.status(500).send("Sorry kiddo, something wrong in the server");
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
