const requireUser = require("../middlewares/requireUser");
const ChatController = require("../controllers/chatController");

const router = require("express").Router();

router.post("/", requireUser, ChatController.accessChat); //not working
router.get("/", requireUser, ChatController.fetchChats);
router.post("/createGroup", requireUser, ChatController.createGroupChat);
router.put("/renameGroup", requireUser, ChatController.renameGroup);


module.exports = router;
