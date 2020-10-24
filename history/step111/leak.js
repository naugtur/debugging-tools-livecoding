"use strict";
const v8 = require("v8");

const { PerformanceObserver } = require("perf_hooks");

function printMessage(message) {
  process._rawDebug(message);
}

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries());
  console.log(v8.getHeapSpaceStatistics());
});
obs.observe({ entryTypes: ["gc"], buffered: false });
