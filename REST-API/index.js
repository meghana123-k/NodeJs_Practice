const express = require("express");
// const users = require("./MOCK_DATA.json");
const app = express();

const userRouter = require("./routes/user");

const { connectMongoDB } = require("./connection");

const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1").then(() => {
  console.log("MongoDB Connected!");
});

// MiddleWare - pluggin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRouter);
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
