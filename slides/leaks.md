---
theme : "moon"
highlightTheme: "dracula"
transition: "none"
---

# Build your own devtools

@naugtur 2020

---

## memory and Garbage Collection
# 🗑️

---

```js
let holder = {}
const A = () => {
    holder.field = 'A'
    let localVariable = 'B'
}
A()
```

## - - - 
## - - - 

---

## A - - 
## - - - 

---

## A B - 
## - - - 

---

## A B C 
## - - - 

---

## A B C 
## A - - 

---

## 🗑️ A B C 
## A - - 

---

## A - - 
## - - - 

---

