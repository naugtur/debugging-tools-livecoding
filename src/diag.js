"use strict";
const asyncHooks = require("async_hooks");

const allAsyncFinished = [];

const asyncHook = asyncHooks.createHook({
  after(asyncId) {
    allAsyncFinished.push(asyncId);
  },
});

asyncHook.enable();

setTimeout(() => console.log(allAsyncFinished), 1000);
