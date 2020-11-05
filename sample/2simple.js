// A familiar redis caching a large JSON example

const fs = require("fs");
const Redis = require("ioredis");
const redis = new Redis();
const key = "mycache" + Math.random();

async function save(input) {
  return await redis.set(key, JSON.stringify(input));
}
async function check() {
  const data = await redis.get(key);
  if (data) {
    return JSON.parse(data);
  }
}

async function ensureCache(data) {
  const cached = await check();
  if (!cached) {
    console.log("populating");
    await save(data);
  }
}

async function work(file) {
  const data = fs.readFileSync(file);
  await ensureCache(data);
  console.log("cached");
  redis.disconnect();
}

setTimeout(() => work(process.argv[2] || "package-lock.json"), 100);
