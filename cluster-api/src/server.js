import http from "http";
const processId = process.pid;

const server = http.createServer((request, response) => {
  for (let index = 0; index < 1e7; index++);
  response.end(`handled by pid: ${processId}`);
});
server.listen(3000).once("listening", () => {
  console.log("Server started in process", processId);
});

// Graceful shutdown (wait connections be closed to close the app)
process.on("SIGTERM", () => {
  console.log("server ending", new Date().toISOString());
  server.close(() => process.exit());
});

// simulate random error
setTimeout(() => {
  process.exit(1);
}, Math.random() * 1e4); // 10.000 (10 secs)
