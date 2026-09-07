const { log } = require("console");
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  // log("New Request Recieved");
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()} : ${req.method} : ${req.url} : New Request\n`;
  const myUrl = url.parse(req.url, true);
  
  fs.appendFile("logs.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;

      case "/about":
        const username = myUrl.query.name;
        res.end(`Hi! ${username}`);
        break;

      case "/search":
        const search_query = myUrl.query.search_query;
        if(search_query=== undefined) {
          res.end("Enter valid query parameter");
          return;
        }
        res.end("Here are your results for "+search_query)
        break;
      case "/contact":
        res.end("Contact Page");
        break;
      case "/signup":
        if(req.method === "GET") {
          res.end("This is a Signup Form");
        } else if(req.method === "POST") {
          res.end("Success");
        }
        break;
      default:
        res.end("Error page");
    }
  });
});

myServer.listen(8000, () => {
  log("Server started...");
});
