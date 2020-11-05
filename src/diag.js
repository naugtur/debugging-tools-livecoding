"use strict";
const asyncHooks = require("async_hooks");

function printMessage(message) {
  process._rawDebug(message);
}

const data = new Map();

const asyncHook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    data.set(asyncId, { triggerAsyncId, type });
  },

  after(asyncId) {
    const info = data.get(asyncId);
    printMessage(`[${info.triggerAsyncId}->${asyncId}] ${info.type}`);
  },
});

asyncHook.enable();
