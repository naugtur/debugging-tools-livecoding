"use strict";
const asyncHooks = require("async_hooks");
const filePath = process.argv[1];

function printMessage(message) {
  process._rawDebug(message);
}
function getLocation(stack) {
  const frames = stack.split("\n").slice(2); //skip the error and self
  const identified = frames.find((f) => f.includes("(/"));
  const from = frames.find((f) => f.includes(filePath));
  if (!identified) {
    return null;
  }
  if (identified === from) {
    return identified;
  }
  return identified + " FROM " + from;
}

const data = new Map();

Error.stackTraceLimit = Math.max(Error.stackTraceLimit, 20);
const asyncHook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const e = {};
    Error.captureStackTrace(e);
    const location = getLocation(e.stack);
    if (location) {
      data.set(asyncId, { location, type, triggerAsyncId });
    }
  },

  after(asyncId) {
    const info = data.get(asyncId);
    if (!info) return;
    printMessage(`a [${info.triggerAsyncId}->${asyncId}] ${info.location}`);
  },
});
asyncHook.enable();
