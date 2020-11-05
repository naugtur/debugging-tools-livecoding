"use strict";
const v8 = require("v8");

const { PerformanceObserver } = require("perf_hooks");

const obs = new PerformanceObserver((list) => {
  if (list.getEntries().length) {
    console.log(
      v8
        .getHeapSpaceStatistics()
        .filter((stat) =>
          ["new_space", "old_space", "large_object_space"].includes(
            stat.space_name
          )
        )
        .map((stat) => `${stat.space_name}:${stat.space_used_size}`)
    );
  }
});
obs.observe({ entryTypes: ["gc"], buffered: false });
