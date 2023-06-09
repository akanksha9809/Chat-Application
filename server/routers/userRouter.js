const requireUser = require("../middlewares/requireUser");
const UserController = require("../controllers/userController");

const router = require("express").Router();

router.get("/", requireUser, UserController.allUsers);
router.get("/getLoggedUser", requireUser, UserController.getLoggedUser);

module.exports = router;
