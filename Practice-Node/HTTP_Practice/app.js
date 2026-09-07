const http = require("http");

const myServer = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      res.end("Welcome to my Server");
      break;
    case "/about":
      res.statusCode = 200;
      res.end("This is the about page");
      break;
    case "/contact":
      res.statusCode = 200;
      res.end("Contact us at contact@example.com");
      break;
    default:
      res.statusCode = 404;
      res.end("404 Page Not Found");
  }
});

myServer.listen(3000, () => {
  console.log("Server Started....");
});
