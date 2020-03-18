let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

// 웹사이트 홈
app.get("/", function(req, res) {
  // listen 해온 포트에서의 홈 페이지 (localhost:{portnumber}) 접속할때 동작
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg); //
  });
});

http.listen(3000, function() {
  // 리슨 후, 살핼할 콜백
  // 3000번 포트에서 연결을 listen 하는 TCP 서버를 구동함.
  console.log("listening on 3000");
});

// socket.emit 과 io.emit 의 차이는? ->
// socket.emit = sending to sender-client only
// io.emit = sending to all clients, include sender
// socket.broadcast.emit = 자기는 빼고, 다른 클라이언트에만 전달함.
