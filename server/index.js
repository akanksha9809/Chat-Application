const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config("./env");

const app = express();

//middlewares
app.use(express.json({ limit: "10mb" })); //body parser middleware => to accept json data
app.use(morgan("common")); //logs which api is hit
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

//router
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.get("/", (req, res) => {
  res.status(200).send("OK from server");
});

const PORT = process.env.PORT || 4000;

dbConnect();

const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 6000,
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(
      "User Joined Room: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + room
    );
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData?._id);
  });
});
