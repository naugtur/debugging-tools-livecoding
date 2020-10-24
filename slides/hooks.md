---
theme : "moon"
highlightTheme: "dracula"
---

# Build your own devtools

@naugtur 2020

---

## Introduction

---

# 🎣
## Async hooks?

---

## A handwavy explanation

---

### init

```js

Promise.resolve()
    .then( 👋 👋 () => {
        return doingWork()
    })

```
Runs within current call stack

---

### promiseResolve

```js

Promise.resolve() 👋 👋
    .then(() => {
        return doingWork()
    })

```

---

### before

```js

Promise.resolve()
    .then(() =>  👋 👋 {
        return doingWork()
    })

```

---

### after

```js

Promise.resolve()
    .then(() => {
        return doingWork()
    } 👋 👋 )

```

---

### destroy

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

## Let's play

---

### Ok, now for real
## Should I use it?

---


 - Do not use the resource reference in `init`.  
 I didn't even tell you it exists.
 - Be aware hooks have a performance impact
 - Your code in hooks can have even more impact
 - Did I mention it's still experimental?  
 - Some things are only possible with hooks

---


Check out [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage)

You'll definitely use that soon.

---

## Perf tracing is cool though

Use it whenever you need!

---

## PerformanceObserver
```js
const { PerformanceObserver } = require('perf_hooks')

const obs = new PerformanceObserver((list) => {
  list.getEntries()
})
obs.observe({ entryTypes: ['function'], buffered: true })
```

---

## `entryTypes`


 - `node` (Node.js only)
 - `mark` (available on the Web)
 - `measure` (available on the Web)
 - `gc` (Node.js only)
 - `function` (Node.js only)
 - `http2` (Node.js only)
 - `http` (Node.js only)
