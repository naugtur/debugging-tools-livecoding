---
theme : "moon"
highlightTheme: "dracula"
---

# Build your own devtools

@naugtur 2020

---

## Why?

---

# 🏓

*learning through play*

---

## Some Real tools

- Profiling with devtools (`--inspect`)
- [https://clinicjs.org/](https://clinicjs.org/)


---

## Explanations
# 🔎

---

## Event loop 
# 🏃➿

*Did you pay attention in the talks on Monday?*

---

## Obvious simplification

```js
   EVENT LOOP                       EVERYTHING ELSE

  while (true){
    get from the queue
    run it  --->  ( schedules work ) --->   <--- ( events )
  }                                       |
                                          V
                              ( add callback to the queue )

```

---

# 🎣
## Async hooks

---

## A handwavy explanation

---

### `init`

```js

Promise.resolve()
    .then( 👋 👋 () => {
        return doingWork()
    })

```
Runs within current call stack

---

### `promiseResolve`

```js

Promise.resolve() 👋 👋
    .then(() => {
        return doingWork()
    })

```

---

### `before`

```js

Promise.resolve()
    .then(() =>  👋 👋 {
        return doingWork()
    })

```

---

### `after`

```js

Promise.resolve()
    .then(() => {
        return doingWork()
    } 👋 👋 )

```

---

### `destroy`

```js

Promise.resolve()
    .then(() => {
        return doingWork()
    })

...  👋 👋 

```

---

## Here's how you set them up


```js

const asyncHooks = require('async_hooks');
const hook = asyncHooks.createHook({    
    init, 
    before, after,  promiseResolve,
    destroy 
});
hook.enable();

```

---

# 🏂 
## Let's have some fun

---

## Perf tracing 

```bash
node --trace-event-categories node.perf app.js
```

```js
const { performance } = require('perf_hooks');
performance.mark('markID1')

  ⏱

performance.mark('markID2')
performance.measure('description', 'markID1','markID2')
```

```bash
  node_trace.1.log
```

---

### Ok, now for real
## Should I use async_hooks?

---


# 🌵
 - Do not use the resource reference in `init`.  
 I didn't even tell you it exists.
 - Be aware hooks have a performance impact
 - Your code in hooks can have even more impact
 - Did I mention it's still experimental?  
 - Some things are only possible with hooks 🎉

---


Check out [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage)

You'll definitely use that soon.

---

## Use perf tracing!

And not neccessarily as trace log to a file.

---

## PerformanceObserver
```js
const { PerformanceObserver } = require('perf_hooks')

const obs = new PerformanceObserver((list) => {
  list.getEntries()
})
obs.observe({ entryTypes: ['mesaure'], buffered: true })
```

---

## `entryTypes`


 - **`measure`** 
 - `mark` 
 - `node` (Node.js only)
 - `gc` (Node.js only)
 - `http2` (Node.js only)
 - `http` (Node.js only)
 - `function` (Node.js only)


---

# 🍿
## Let's see how that can be ᵃᵇused


---

## `V8` binding

```js
const v8 = require("v8");

v8.getHeapSnapshot()
v8.getHeapStatistics()
v8.setFlagsFromString(flags)
v8.writeHeapSnapshot([filename])
```

---

# 👋