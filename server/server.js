var path = require("path");
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
var { generateMessage } = require("./utils/message");
var publicPath = path.join(__dirname, "../public");
var port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
server.listen(port, function () {
  console.log(`server is running on port ${port}`);
});

// processing

io.on("connection", function (socket) {
  console.log("new user connected");
  socket.emit("newMessage", generateMessage("server", "hi client"));
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin server", "new user joined")
  );
  socket.on("createMessage", function (message, callback) {
    console.log(message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("the message has been  sent");
  });

  socket.on("disconnect", function () {
    console.log("user was disconnect");
  });
});
