require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const port = 4000;

const cont = require("./controller");

const app = express();

app.use(json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(console.log);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000
    }
  })
);
app.post(`/api/auth/register`, cont.registerUser);
app.post("/api/auth/login", cont.loginUser);
app.get(`/api/posts/:id`, cont.getPosts);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
