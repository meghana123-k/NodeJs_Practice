const express = require("express");

const router = express.Router();

const {
  handleAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");
// router.get("/", async (req, res) => {
//   const allDBUsers = await User.find({});
//   const html = `
//         <ul>
//         ${allDBUsers
//           .map((user) => {
//             return `<li>${user.first_name} - ${user.email}</li>`;
//           })
//           .join("")}
//         </ul>
//     `;
//   res.send(html);
// });

router.route("/").get(handleAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
