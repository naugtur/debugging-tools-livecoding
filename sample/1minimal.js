// A slow function blocking eventloop
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

// A tiny example of asynchronous concurrency affected by the function above
Promise.all([
  Promise.resolve(1)
    .then((a) => 100 * a)
    .then(meSoSlow),
  Promise.resolve(2)
    .then((a) => 100 * a)
    .then(meSoSlow),
]);
