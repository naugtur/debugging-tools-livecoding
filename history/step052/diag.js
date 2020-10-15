"use strict";
const asyncHooks = require("async_hooks");
const { performance } = require('perf_hooks')
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

  before (asyncId) {
    const info = data.get(asyncId)
    if (!info) return
    performance.mark('before' + asyncId)
  },

  after(asyncId) {
    const info = data.get(asyncId);
    if (!info) return;
    performance.mark('after' + asyncId)
    performance.measure(`[${pad(asyncId)} from ${pad(info.triggerAsyncId)}] ${info.location}`, 'before' + asyncId, 'after' + asyncId)
    printMessage(`a [${info.triggerAsyncId}->${asyncId}] ${info.location}`);
  },

  destroy(asyncId) {
    data.delete(asyncId)
  }
});
asyncHook.enable();

function pad (num) {
  if (num < 10) return '00000' + num
  if (num < 100) return '0000' + num
  if (num < 1000) return '000' + num
  if (num < 10000) return '00' + num
  if (num < 100000) return '0' + num
  return num
}