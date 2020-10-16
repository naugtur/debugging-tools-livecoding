"use strict";
const asyncHooks = require("async_hooks");

const asyncHook = asyncHooks.createHook({
  after(asyncId) {
    // a function finished its execution in an async hop
  },
});

asyncHook.enable();
