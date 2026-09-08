const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Express");
});

app.get("/about", (req, res) => {
  return res.status(200).send("This is About Page");
});

app.get("/contact", (req, res) => {
  return res.status(200).send("Contact Us");
});

app.use((req, res) => {
  return res.status(404).send("404 Route Not Found");
});

app.listen(3000, () => console.log("Server Started..."));
