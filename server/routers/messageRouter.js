const requireUser = require("../middlewares/requireUser");
const MessageController = require("../controllers/messageController");

const router = require("express").Router();

router.post("/", requireUser, MessageController.sendMessage);

module.exports = router;
