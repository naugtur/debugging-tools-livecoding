"use strict";
const asyncHooks = require("async_hooks");

function printMessage(message) {
  process._rawDebug(message);
}
function getLocation(stack) {
  const frames = stack.split("\n").slice(2); //skip the error and self
  const identified = frames.find((f) => f.includes("(/"));
  if (!identified) {
    return null;
  }
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
