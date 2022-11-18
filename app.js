// app.js
const http = require("http"); 
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    userID: 1,
    userName: "Rebekah Johnson",
    postingId: 1,
    postingTitle: "간단한 HTTP API 개발 시작!",
    postingContent:
      "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
  },
  {
    userID: 2,
    userName: "Fabian Predovic",
    postingId: 2,
    postingTitle: "HTTP의 특성",
    postingContent: "Request/Response와 Stateless!!",
  },
];

const httpRequestListener = function (request, response) {
  const { url, method } = request;
  if (method === "GET") {
    if (url === "/get_users") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: 'users' }));
    }
    if (url === '/get_posts') {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: 'posts' }));
    }
  } else if (method === "POST") {
    if (url === "/users") {
      let body = "";
      request.on("data", (data) => {
        const user = JSON.parse(data); 

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
      }); 

      request.on("end", () => {
        response.end(JSON.stringify({ message: ' userCreated ' })); // (9)
      });
    }
    if (url === '/posts') {
      let body = "";
      request.on("data", (data) => {
        const post = JSON.parse(data);

        posts.push({
          userID: post.userID,
          userName: post.userName,
          postingId: post.postingId,
          postingTitle: post.postingTitle,
          postingContent: post.postingContent,
        });
      }); 

      request.on("end", () => {
        
        response.end(JSON.stringify({ message: ' postCreated ' }));
      });
    }
  }
};

server.on("request", httpRequestListener);

const IP = '127.0.0.1'
const PORT = 8000

  server.listen(PORT, IP, function() {
    console.log(`Listening to requests on ip ${IP} & port ${PORT}`);
});
