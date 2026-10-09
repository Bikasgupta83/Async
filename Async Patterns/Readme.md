# 🔄 Async Patterns in JavaScript

Async patterns are common techniques used to control **when, how, and how often asynchronous operations execute**.

They help us handle:

* API requests
* User events
* Multiple asynchronous tasks
* Network failures
* Slow operations
* Task dependencies
* Performance optimization

---

# 📚 Topics Covered

1. [Debouncing](#1-debouncing)
2. [Throttling](#2-throttling)
3. [Concurrency Control](#3-concurrency-control)
4. [Retry Logic](#4-retry-logic)
5. [Timeout Pattern](#5-timeout-pattern)
6. [Sequential Execution](#6-sequential-execution)
7. [Parallel Execution](#7-parallel-execution)

---

# 1. Debouncing

## 📌 Definition

**Debouncing delays the execution of a function until a specified amount of time has passed without the event occurring again.**

In simple words:

> **"Wait until the user stops doing something, then execute."**

### Example Use Case

A search box.

If a user types:

```text
J → Ja → Jav → Java
```

We don't want to make an API request after every character.

Instead:

```text
User types
    ↓
Timer starts
    ↓
User types again
    ↓
Previous timer cancelled
    ↓
New timer starts
    ↓
User stops typing
    ↓
Wait 500ms
    ↓
Execute search
```

### Basic Example

```javascript
let timer;

input.addEventListener("input", () => {

    clearTimeout(timer);

    timer = setTimeout(() => {

        console.log("Search API called");

    }, 500);

});
```

### Important Point

Every new event cancels the previous timer.

### Common Use Cases

* Search boxes
* Autocomplete
* Search suggestions
* Form validation
* Username availability checking
* Autosave

### Interview Definition

> Debouncing ensures that a function executes only after the event has stopped occurring for a specified period.

---

# 2. Throttling

## 📌 Definition

**Throttling limits how frequently a function can execute.**

In simple words:

> **"Don't allow the function to run too frequently."**

For example, a scroll event can fire many times per second.

Instead of executing our function for every event:

```text
Scroll → function
Scroll → function
Scroll → function
Scroll → function
Scroll → function
```

We can limit it:

```text
0 sec → execute
1 sec → execute
2 sec → execute
3 sec → execute
```

### Basic Example

```javascript
function throttle(callback, delay) {

    let lastTime = 0;

    return function () {

        const currentTime = Date.now();

        if (currentTime - lastTime >= delay) {

            callback();

            lastTime = currentTime;

        }

    };

}
```

Usage:

```javascript
window.addEventListener(
    "scroll",
    throttle(() => {
        console.log("Scrolling...");
    }, 1000)
);
```

### Common Use Cases

* Scroll events
* Resize events
* Mouse movement
* Drag events
* Window resizing
* Game controls

---

# 3. Concurrency Control

## 📌 Definition

**Concurrency control limits the number of asynchronous operations running at the same time.**

Suppose we have:

```text
100 tasks
```

Instead of running all 100 simultaneously:

```text
100 tasks
   ↓
Run everything
```

we can set:

```text
Concurrency limit = 5
```

So:

```text
Task 1   Task 2   Task 3   Task 4   Task 5
   ↓        ↓        ↓        ↓        ↓
              Running

When one finishes:

Task 6 starts
```

### Why Use Concurrency Control?

Running too many tasks simultaneously can:

* Overload the server
* Consume too many resources
* Hit API rate limits
* Increase memory usage
* Reduce application performance

### Example

```javascript
async function runTasks(tasks, limit) {

    let index = 0;

    async function worker() {

        while (index < tasks.length) {

            const currentIndex = index++;

            await tasks[currentIndex]();

        }

    }

    const workers = [];

    for (let i = 0; i < limit; i++) {

        workers.push(worker());

    }

    await Promise.all(workers);

}
```

Usage:

```javascript
await runTasks(tasks, 5);
```

This means:

```text
100 tasks
     +
limit = 5
     ↓
Maximum 5 tasks running at once
```

### Common Use Cases

* Processing many API requests
* Uploading multiple files
* Downloading multiple files
* Processing database records
* Batch operations

### Interview Definition

> Concurrency control limits the number of asynchronous operations that can run simultaneously.

---

# 4. Retry Logic

## 📌 Definition

**Retry logic attempts an asynchronous operation again when it fails.**

Some failures are temporary.

For example:

```text
Client
   ↓
API Request
   ↓
Network Error
   ↓
Retry
   ↓
API Request
   ↓
Success
```

### Basic Retry

```javascript
async function retry(fn, attempts) {

    for (let i = 1; i <= attempts; i++) {

        try {

            return await fn();

        } catch (error) {

            if (i === attempts) {

                throw error;

            }

        }

    }

}
```

Usage:

```javascript
const result = await retry(
    () => fetch("/api/products"),
    3
);
```

The operation can be attempted up to 3 times.

---

# 🔁 Exponential Backoff

Instead of retrying immediately, we wait longer after each failure.

Example:

```text
Attempt 1 → Failed
             ↓
          Wait 1 sec

Attempt 2 → Failed
             ↓
          Wait 2 sec

Attempt 3 → Failed
             ↓
          Wait 4 sec

Attempt 4
```

A common formula is:

```javascript
delay = baseDelay * 2 ** retryCount;
```

Example:

```javascript
const delay = 1000 * 2 ** retryCount;
```

This produces:

```text
1 second
2 seconds
4 seconds
8 seconds
```

### Why Use Exponential Backoff?

It prevents the client from repeatedly hitting a server that may already be experiencing problems.

### Common Use Cases

* Temporary network failures
* Temporary server errors
* API requests
* Cloud services
* External service communication

### Important

Don't blindly retry every error.

For example, invalid user input generally won't become valid just because you retry the same request.

---

# 5. Timeout Pattern

## 📌 Definition

A timeout prevents an asynchronous operation from waiting indefinitely.

In simple words:

> **"If this operation takes too long, stop waiting."**

Example:

```text
API Request
    ↓
Wait
    ↓
Wait
    ↓
5 seconds
    ↓
Timeout
```

### Using `Promise.race()`

```javascript
function timeout(ms) {

    return new Promise((_, reject) => {

        setTimeout(() => {

            reject(new Error("Request timed out"));

        }, ms);

    });

}
```

Then:

```javascript
const request = fetch("/api/products");

const result = await Promise.race([
    request,
    timeout(5000)
]);
```

`Promise.race()` settles when the **first promise settles**.

---

# ⛔ Timeout with AbortController

For `fetch()`, `AbortController` can be used when we want to cancel the request.

```javascript
const controller = new AbortController();

const timer = setTimeout(() => {

    controller.abort();

}, 5000);

try {

    const response = await fetch("/api/products", {
        signal: controller.signal
    });

    const data = await response.json();

} catch (error) {

    console.log("Request failed or timed out");

} finally {

    clearTimeout(timer);

}
```

### Common Use Cases

* API requests
* Network requests
* File uploads/downloads
* Slow operations
* Preventing indefinite waiting

### Interview Definition

> A timeout pattern stops or fails an asynchronous operation after a specified amount of time.

---

# 6. Sequential Execution

## 📌 Definition

**Sequential execution means running asynchronous tasks one after another.**

Example:

```text
Task 1
  ↓
Complete
  ↓
Task 2
  ↓
Complete
  ↓
Task 3
  ↓
Complete
```

### Example

```javascript
async function runTasks() {

    await task1();

    await task2();

    await task3();

}
```

Task 2 starts only after Task 1 finishes.

Task 3 starts only after Task 2 finishes.

---

## 📌 When Should We Use Sequential Execution?

Use sequential execution when one task depends on the result of another task.

Example:

```text
Create User
    ↓
Get User ID
    ↓
Create Order
    ↓
Send Confirmation
```

We cannot create the order before getting the user ID.

### Processing Tasks Sequentially

```javascript
async function processTasks(tasks) {

    for (const task of tasks) {

        await task();

    }

}
```

### Common Use Cases

* Dependent API calls
* Database operations with dependencies
* Task queues
* Step-by-step workflows
* File processing where order matters

---

# 7. Parallel Execution

## 📌 Definition

**Parallel execution means starting multiple independent asynchronous operations without waiting for each one individually.**

Example:

```text
             ┌── Products API
             │
Start ───────┼── Users API
             │
             └── Categories API
```

We can use:

```javascript
Promise.all()
```

### Example

```javascript
const [
    products,
    users,
    categories
] = await Promise.all([

    getProducts(),

    getUsers(),

    getCategories()

]);
```

All three operations are started without waiting for the previous one to finish.

---

## Sequential vs Parallel

Suppose:

```text
Products API    → 2 seconds
Users API       → 3 seconds
Categories API  → 1 second
```

### Sequential

```javascript
await getProducts();
await getUsers();
await getCategories();
```

Approximate total:

```text
2 + 3 + 1 = 6 seconds
```

### Parallel

```javascript
await Promise.all([
    getProducts(),
    getUsers(),
    getCategories()
]);
```

Approximate total:

```text
max(2, 3, 1) = 3 seconds
```

The exact real-world time can vary because of network, server, browser, and other factors.

### Important

Parallel execution is useful when operations are **independent**.

Don't use parallel execution when:

```text
Task 2 depends on Task 1
```

---

# 🔥 Debouncing vs Throttling

This is a very common interview question.

| Debouncing                 | Throttling                 |
| -------------------------- | -------------------------- |
| Waits until activity stops | Limits execution frequency |
| Executes after inactivity  | Executes periodically      |
| Search box                 | Scroll                     |
| Autocomplete               | Resize                     |
| Form validation            | Mouse movement             |
| "Wait until I'm done"      | "Don't run too often"      |

### Easy Memory Trick

```text
Debounce
    ↓
"Wait until I stop."

Throttle
    ↓
"Slow me down."
```

---

# 🔥 Sequential vs Parallel

| Sequential                 | Parallel                        |
| -------------------------- | ------------------------------- |
| One task after another     | Multiple tasks started together |
| Uses sequential `await`    | Commonly uses `Promise.all()`   |
| Useful for dependent tasks | Useful for independent tasks    |
| Usually takes longer       | Can reduce total waiting time   |
| Order is important         | Tasks can run independently     |

### Sequential

```javascript
const user = await getUser();

const orders = await getOrders(user.id);
```

`getOrders()` needs the result of `getUser()`.

### Parallel

```javascript
const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
]);
```

Neither request depends on the other.

---

# 🧠 Quick Revision

| Pattern                 | What does it do?               | Example               |
| ----------------------- | ------------------------------ | --------------------- |
| **Debouncing**          | Wait until activity stops      | Search box            |
| **Throttling**          | Limit execution frequency      | Scroll                |
| **Concurrency Control** | Limit simultaneous tasks       | 100 tasks, limit 5    |
| **Retry Logic**         | Try again after failure        | Temporary API failure |
| **Timeout**             | Stop waiting after a limit     | Slow API              |
| **Sequential**          | Run tasks one by one           | Dependent operations  |
| **Parallel**            | Run independent tasks together | Multiple API calls    |

---

# 🎯 Easy Way to Remember All 7

```text
Debounce
→ Wait until I stop.

Throttle
→ Don't let me run too often.

Concurrency
→ Only N tasks at once.

Retry
→ Try again if it temporarily fails.

Timeout
→ Don't wait forever.

Sequential
→ Finish this, then start the next.

Parallel
→ Start independent tasks together.
```

---

# 💼 Real-World Example

Imagine an e-commerce application.

A user searches for products:

```text
Debouncing
→ Wait until the user stops typing.
```

The user scrolls through products:

```text
Throttling
→ Limit scroll-related operations.
```

The application needs to process 100 product images:

```text
Concurrency Control
→ Process only 5 at a time.
```

An API temporarily fails:

```text
Retry Logic
→ Try the request again.
```

An API takes too long:

```text
Timeout
→ Stop waiting after 5 seconds.
```

Checkout workflow:

```text
Sequential
→ Validate user
→ Create order
→ Process order
→ Send confirmation
```

Loading independent page data:

```text
Parallel
→ Products
→ Categories
→ Recommendations
```

---

# 🎯 Interview Questions

### 1. What is debouncing?

Debouncing delays function execution until a specified period has passed without another event.

### 2. What is throttling?

Throttling limits how frequently a function can execute.

### 3. Difference between debounce and throttle?

Debouncing waits for inactivity, while throttling limits execution frequency.

### 4. What is concurrency control?

It limits the number of asynchronous operations running at the same time.

### 5. What is retry logic?

Retry logic attempts a failed asynchronous operation again, usually for potentially temporary failures.

### 6. What is exponential backoff?

It progressively increases the delay between retry attempts.

### 7. What is a timeout?

A timeout limits how long an application waits for an asynchronous operation.

### 8. What is sequential execution?

Running one asynchronous operation and waiting for it to finish before starting the next.

### 9. What is parallel execution?

Starting independent asynchronous operations together instead of waiting for each one individually.

### 10. Which method is commonly used for parallel promises?

```javascript
Promise.all()
```

---

# ⭐ Key Takeaways

```text
Debounce       → Wait for inactivity
Throttle       → Limit frequency
Concurrency    → Limit simultaneous work
Retry          → Try failed operation again
Timeout        → Don't wait forever
Sequential     → One after another
Parallel       → Independent tasks together
```

These patterns are especially useful when working with **Promises, async/await, Fetch API, APIs, DOM events, and MERN applications**.
