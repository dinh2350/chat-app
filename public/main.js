var socket = io();
socket.on("connect", function () {
  console.log("conented to server");

  socket.emit(
    "createMessage",
    {
      text: "hello",
      from: "kakashi",
    },
    (data) => {
      console.log("success : ", data);
    }
  );
});
socket.on("disconnect", function () {
  console.log("disconnected from server");
});

// event

$("#message-form").on("submit", (event) => {
  event.preventDefault();
  socket.emit(
    "createMessage",
    {
      text: $("[name=message]").val(),
      from: "User",
    },
    (data) => {
      console.log("success : ", data);
    }
  );
});

socket.on("newMessage", function (message) {
  console.log(message);
  var li = $(`<li></li>`);
  li.text(`${message.from} : ${message.text}`);
  $("#messages").append(li);
});
