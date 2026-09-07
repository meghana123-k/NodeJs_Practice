const http = require("http");
const url = require("url");
const myServer = http.createServer((req, res) => {
  const myUrl = url.parse(req.url, true);
  switch (myUrl.pathname) {
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
    case "/products":
      const productName = myUrl.query.name;
      const price = myUrl.query.price;
      if (productName === undefined || price === undefined) {
          res.statusCode = 400;
          res.end("Missing Product Information");
          return;
        } else {
          res.statusCode = 200;
          res.end(`Product: ${productName}\nPrice: ${price}`);
      }
      break;
    default:
      res.statusCode = 404;
      res.end("404 Page Not Found");
  }
});

myServer.listen(3000, () => {
  console.log("Server Started....");
});
