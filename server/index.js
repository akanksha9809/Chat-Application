const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");
const morgan = require("morgan");

dotenv.config("./env");

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" })); //body parser middleware => to accept json data
app.use(morgan("common")); //logs which api is hit

//router
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.get("/", (req, res) => {
  res.status(200).send("OK from server");
});

const PORT = process.env.PORT || 4001;

dbConnect();
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
