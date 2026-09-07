// const http = require("http");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {
  res.send(
    "Hello! My name is " +
      req.query.name +
      " I'm " +
      req.query.age +
      " year old.",
  );
});

app.listen(8000, () => {
  console.log("Server Started...");
});
// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log("Server started...");
// });
