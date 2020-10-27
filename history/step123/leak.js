"use strict";
const v8 = require("v8");

const { PerformanceObserver } = require("perf_hooks");

const previous = {};
const total = {};

const obs = new PerformanceObserver((list) => {
  if (list.getEntries().length) {
    const current = v8
      .getHeapSpaceStatistics()
      .filter((stat) => stat.space_name != "new_space")
      .reduce((acc, stat) => {
        acc[stat.space_name] = stat.space_used_size;
        return acc;
      }, {});

    Object.keys(current).map((key) => {
      if (current[key] > previous[key]) {
        total[key]++;
      } else {
        total[key] = 0;
      }

      if (total[key] >= 5) {
        console.log(`I think you got a leak in ${key} dear`);
        total[key] = 0;
      }
    });
    Object.assign(previous, current);
  }
});
obs.observe({ entryTypes: ["gc"], buffered: false });
