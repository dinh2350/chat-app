var path = require("path");
var express = require("express");
var http = require("http");
var socketIO = require("socket.io");
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
  socket.emit("newMessage", {
    from: "letCode",
    text: "hi baby",
    createAt: new Date().getTime(),
  });

  socket.on("createMessage", function (message) {
    console.log(message);
    socket.broadcast.emit("newMessage", {
      from: message.from,
      text: message.text,
    });
  });

  socket.on("disconnect", function () {
    console.log("user was disconnect");
  });
});
