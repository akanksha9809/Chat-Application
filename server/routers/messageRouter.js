const requireUser = require("../middlewares/requireUser");
const MessageController = require("../controllers/messageController");

const router = require("express").Router();

router.post("/", requireUser, MessageController.sendMessage);
router.get("/:chatId", requireUser, MessageController.allMessage);

module.exports = router;
