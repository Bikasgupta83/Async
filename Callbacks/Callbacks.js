//# JavaScript Callbacks

//! Callback

//? A callback function is a function that is passed as an argument
//? to another function and is called by that function at a specific time.

//? A callback can be synchronous or asynchronous.
//? Callback does NOT automatically mean asynchronous.

function greet(name, callback) {
    console.log("Hello " + name);

    callback();

}

function bye() {
    console.log("Good Bye");
}

greet("Bikas", bye);

//? Output:
//? Hello Bikas
//? Good Bye

//? Here:
//? bye is passed as an argument to greet()
//? greet receives it through the callback parameter
//? callback() executes the bye function

// ----------------------------------------------------------------------------------------

//! Callback with Asynchronous Operation

//? A callback is commonly used with asynchronous APIs such as:
//? setTimeout(), event listeners, network requests, etc.

function welcome() {
    console.log("Welcome Bikas");
}

console.log("Start");

setTimeout(welcome, 2000);

console.log("End");

//? Output:
//? Start
//? End
//? Welcome Bikas

//? setTimeout() schedules the callback.
//? JavaScript does not wait for the timer to finish.
//? The callback runs later when the timer is ready
//? and the Event Loop allows it to execute.

// ----------------------------------------------------------------------------------------

//! Callback Hell

//? Callback Hell occurs when multiple asynchronous operations
//? are nested inside one another, making the code difficult
//? to read, maintain, and debug.

//? It is also called the "Pyramid of Doom".

// 1. Get user
//       ↓
// 2. Get user's orders
//       ↓
// 3. Get order details
//       ↓
// 4. Process payment
//       ↓
// 5. Send confirmation

// Example of Callback Hell:

getUser((user) => {


    getOrders(user, (orders) => {

        getOrderDetails(orders, (details) => {

            processPayment(details, (payment) => {

                sendConfirmation(payment, () => {

                    console.log("Done");

                });

            });

        });

    });


});

//? The problem is that every asynchronous operation
//? is nested inside the previous operation.

//? As the number of operations increases,
//? the code becomes difficult to read and maintain.

// ----------------------------------------------------------------------------------------

//! Error-First Callback

//? In traditional Node.js callback-based APIs,
//? a common pattern is to pass the error as the first argument.

//? Pattern:
//? callback(error, result)

function getUser(callback) {


    setTimeout(() => {

        const user = {
            name: "Bikas",
            id: 101
        };

        callback(null, user);

    }, 1000);


}

getUser((error, user) => {


    if (error) {
        console.log("Error:", error);
        return;
    }

    console.log("User:", user);


});

//? null means there was no error.
//? If an error occurs, the first argument contains the error.

// ----------------------------------------------------------------------------------------

//! Callback Hell -> Promise

//? Promises don't eliminate callbacks.
//? They provide a better structure for managing asynchronous
//? results and chaining multiple asynchronous operations.

//? Promise-based flow:

getUser()
    .then((user) => {
        return getOrders(user);
    })
    .then((orders) => {
        return getOrderDetails(orders);
    })
    .then((details) => {
        return processPayment(details);
    })
    .then((payment) => {
        return sendConfirmation(payment);
    })
    .then(() => {
        console.log("Done");
    })
    .catch((error) => {
        console.log("Error:", error);
    });

//? Each .then() receives the result of the previous Promise.

//? If any Promise is rejected,
//? the error can be handled by .catch().

// ----------------------------------------------------------------------------------------

//! Important Point About Promises

//? Promises do NOT remove callbacks completely.

//? In this code:

promise.then((data) => {
    console.log(data);
});

//? The function:
//?
//? (data) => {
//?     console.log(data);
//? }
//?
//? is still a callback.

//? Promises provide a structured way to handle
//? asynchronous results and avoid deeply nested callbacks.

// ----------------------------------------------------------------------------------------

//! async - await

//? async/await provides a cleaner way to work with Promises.
//? It makes asynchronous code look more like synchronous code.

//? async functions always return a Promise.
//? await pauses the execution of that async function
//? until the Promise settles.

//? It does NOT block the entire JavaScript thread.

async function getData() {
    try {

        const user = await getUser();

        const orders = await getOrders(user);

        const details = await getOrderDetails(orders);

        const payment = await processPayment(details);

        await sendConfirmation(payment);

        console.log("Done");

    } catch (error) {

        console.log("Error:", error);

    }
}

getData();

//? try block:
//? Contains the asynchronous operations.

//? catch block:
//? Handles rejected Promises/errors.

// ----------------------------------------------------------------------------------------

//! Callback vs Promise

// ----------------------------------------------------------------------------------------
// | Callback                             | Promise                                      |
// | ------------------------------------ | -------------------------------------------- |
// | Function passed to another function  | Object representing future result            |
// | Can be synchronous or asynchronous   | Designed for asynchronous result handling    |
// | Can become deeply nested              | Supports chaining                            |
// | Callback Hell is possible             | Reduces nested structure                     |
// | Error handling can become repetitive | .catch() provides structured error handling  |
// | Common in older async code            | Common modern async pattern                  |
// ----------------------------------------------------------------------------------------

//! Callback -> Promise -> async/await

//? Callback:
//?     Function passed to another function
//?             ↓
//? Callback Hell:
//?     Too many nested callbacks
//?             ↓
//? Promise:
//?     Better structure for async operations
//?             ↓
//? .then() / .catch():
//?     Handle success and errors
//?             ↓
//? async/await:
//?     Cleaner syntax for working with Promises

// ----------------------------------------------------------------------------------------

//! Important Interview Points

//? 1. What is a callback?
//? A function passed as an argument to another function
//? to be executed at a specific time.

//? 2. Is every callback asynchronous?
//? No. A callback can be synchronous or asynchronous.

//? 3. What is Callback Hell?
//? Excessive nesting of callbacks, especially for dependent
//? asynchronous operations.

//? 4. What is the Pyramid of Doom?
//? Another name commonly used for deeply nested Callback Hell.

//? 5. How do Promises solve Callback Hell?
//? Promises allow asynchronous operations to be chained
//? using .then() instead of deeply nested callbacks.

//? 6. Does async/await replace Promises?
//? No. async/await is built on top of Promises.

//? 7. Do Promises completely eliminate callbacks?
//? No. Functions passed to .then(), .catch(), etc.
//? are still callbacks.
