"use strict";
const { PerformanceObserver } = require('perf_hooks')


function printMessage(message) {
  process._rawDebug(message);
}

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries())
})
obs.observe({ entryTypes: ['http'], buffered: false })