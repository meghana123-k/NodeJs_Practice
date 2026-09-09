const User = require("../models/user");

const handleAllUsers = async (req, res) => {
  const allDBUsers = await User.find({});

  return res.json(allDBUsers);
};

const handleGetUserById = async (req, res) => {
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
};
const handleUpdateUserById = async (req, res) => {
  // Edit the user with id
  const user = await User.findByIdAndUpdate(req.params.id, req.body);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  return res.json({ status: "success", user });
};

const handleDeleteUserById = async (req, res) => {
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
};

const handleCreateNewUser = async (req, res) => {
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

  return res.status(201).json({ status: "Success", id: result._id });
  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "success", id: users.length });
  // });
};
module.exports = {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
