var socket = io();

socket.on("connect", function () {
  console.log("conented to server");

  socket.emit("createMessage", {
    text: "hello",
    from: "kakashi",
  });
});

socket.on("disconnect", function () {
  console.log("disconnected from server");
});

socket.on("newMessage", function (email) {
  console.log(email);
});
