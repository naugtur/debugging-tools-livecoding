"use strict";
const asyncHooks = require("async_hooks");

function printMessage(message) {
  process._rawDebug(message);
}

const data = new Map();

Error.stackTraceLimit = Math.max(Error.stackTraceLimit, 20);
const asyncHook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const e = {};
    Error.captureStackTrace(e);
    if (e.stack.includes("(/")) {
      data.set(asyncId, { stack: e.stack, type, triggerAsyncId });
    }
  },

  after(asyncId) {
    const info = data.get(asyncId);
    if (!info) return;
    printMessage(`[${info.triggerAsyncId}->${asyncId}] ${info.stack}`);
  },
});

asyncHook.enable();
