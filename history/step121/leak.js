"use strict";
const v8 = require("v8");

const { PerformanceObserver } = require("perf_hooks");

const previous = {
  new_space: 0,
  old_space: 0,
  large_object_space: 0,
};

const obs = new PerformanceObserver((list) => {
  if (list.getEntries().length) {
    const current = v8
      .getHeapSpaceStatistics()
      .filter((stat) =>
        ["new_space", "old_space", "large_object_space"].includes(
          stat.space_name
        )
      )
      .reduce((acc, stat) => {
        acc[stat.space_name] = stat.space_used_size;
        return acc;
      }, {});

    console.log(
      Object.keys(current).map(
        (key) =>
          `${key}:${
            (current[key] - previous[key]) /
            Math.abs(current[key] - previous[key])
          }`
      )
    );
    Object.assign(previous, current);
  }
});
obs.observe({ entryTypes: ["gc"], buffered: false });
