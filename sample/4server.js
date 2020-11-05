"use strict";
const http = require("http");
let anActualLeak = [];

function meSoSlow(time) {
  time = time || 100;
  const t0 = Date.now();
  console.time("slow");
  while (Date.now() < t0 + time) {
    "How many CPU cycles does it take to heat the room by 1 degree?"
      .split("")
      .join(":)");
  }
  console.timeEnd("slow");
}

const server = http.createServer(async function (req, res) {
  await Promise.all([
    Promise.resolve(1)
      .then((a) => 100 * a)
      .then(meSoSlow),
    Promise.resolve(2)
      .then((a) => 100 * a)
      .then(meSoSlow),
  ]);
  anActualLeak.push(req);

  res.end("hello world");
});

server.listen(0, "localhost", function () {
  const addr = server.address();
  console.log(`http://${addr.address}:${addr.port}/`);
  http.get(
    `http://${addr.address}:${addr.port}/something?attr=value`,
    function (res) {
      res.resume();
      res.once("end", server.close.bind(server));
    }
  );
});
