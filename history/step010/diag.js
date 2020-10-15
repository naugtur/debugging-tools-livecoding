"use strict";
const asyncHooks = require("async_hooks");

function printMessage(message) {
  process._rawDebug(message);
}

const asyncHook = asyncHooks.createHook({
  after(asyncId) {
    printMessage(`[${asyncId}] hop`);
  },
});

asyncHook.enable();
