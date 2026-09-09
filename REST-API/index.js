const express = require("express");
// const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");

const mongoose = require("mongoose");

const PORT = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));
// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);
// MiddleWare - pluggin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/users", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
        <ul>
        ${allDBUsers
          .map((user) => {
            return `<li>${user.first_name} - ${user.email}</li>`;
          })
          .join("")}
        </ul>
    `;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);

    const html = `
    <ul>
    <li>Id: ${user.id}</li>
            <li>First Name: ${user.first_name}</li>
            <li>Last Name: ${user.last_name}</li>
            <li>Email: ${user.email}</li>
            <li>Gender: ${user.gender}</li>
            <li>Job Title: ${user.job_title}</li>
            </ul>
            `;
    return res.send(html);
  })
  .patch(async (req, res) => {
    // Edit the user with id
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.json({ status: "success", user });
  })
  .delete(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    // Delete the user with id
    await User.findByIdAndDelete(req.params.id);

    return res.json({
      status: "success",
    });
  });
app.post("/api/users", async (req, res) => {
  // Create new users;
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(404).json({ error: "All fields required." });
  }
  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  console.log(result);

  return res.status(201).json({ status: "Success" });
  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
});
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
