const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const PORT = 8000;

// MiddleWare - pluggin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/users", (req, res) => {
  const html = `
        <ul>
        ${users
          .map((user) => {
            return `<li>${user.first_name}</li>`;
          })
          .join("")}
        </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
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
  .patch((req, res) => {
    // Edit the user with id
    const user = users.find((user) => user.id === Number(req.params.id));
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    Object.assign(user, req.body);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Failed to update user",
        });
      }
      return res.json({ status: "success", user });
    });
  })
  .delete((req, res) => {
    // Delete the user with id
    const updatedUsers = users.filter(
      (user) => user.id !== Number(req.params.id),
    );
    fs.writeFile(
      "./MOCK_DATA.json",
      JSON.stringify(updatedUsers),
      (err, data) => {
        return res.json({
          status: "success",
          isDeleted: true,
          id: req.params.id,
        });
      },
    );
  });
app.post("/api/users", (req, res) => {
  // Create new users;
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
