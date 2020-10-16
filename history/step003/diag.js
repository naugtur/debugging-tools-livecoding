"use strict";
const asyncHooks = require("async_hooks");

const asyncHook = asyncHooks.createHook({
  after(asyncId) {
    console.log(`[${asyncId}] hop`);
  },
});

asyncHook.enable();
