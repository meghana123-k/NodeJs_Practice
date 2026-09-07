const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;
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
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // Delete the user with id
    return res.json({ status: "pending" });
  });

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
