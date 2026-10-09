//! Async / Await
//? async/await is a cleaner way to work with Promises.
//? It makes asynchronous code look and behave more like synchronous code,
//? while still being non-blocking for the JavaScript thread.


// ========================================================================================


//! 1. async Function

//? An async function is a function declared with the `async` keyword.

//? IMPORTANT:
//? An async function ALWAYS returns a Promise.
//
//? If the function returns a normal value,
//? JavaScript automatically wraps that value inside a fulfilled Promise.


//! Example

async function greet() {

    return "Hello Bikas";

}

const result = greet();

console.log(result);


//? Output:
//
//? Promise { "Hello Bikas" }


//? The above code is conceptually similar to:
//
//? function greet() {
//?     return Promise.resolve("Hello Bikas");
//? }



// ========================================================================================


//! Getting the value returned by an async function

async function greet1() {

    return "Hello Bikas";

}

greet1()
    .then((result) => {

        console.log(result);

    });


//? Output:
//
//? Hello Bikas


//? greet1() returns a Promise.
//
//? Promise
//?    ↓
//? .then()
//?    ↓
//? "Hello Bikas"



// ========================================================================================


//! async Function Returning an Object

//? An async function can return an object,
//? but the object is wrapped inside a Promise.

async function getUserInfo() {

    return {
        name: "Bikas",
        id: 101
    };

}

getUserInfo()
    .then((user) => {

        console.log(user);

    });


//? Output:
//
//? {
//?     name: "Bikas",
//?     id: 101
//? }



// ========================================================================================


//! 2. await

//? await is used to wait for the result of a Promise.

//? await can normally be used inside an async function.

//? When JavaScript reaches await:
//? - The current async function pauses.
//? - JavaScript does NOT block the entire thread.
//? - Other JavaScript work can continue.
//? - When the Promise settles, the async function resumes.


//! Example

function getUser() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve("Bikas");

        }, 2000);

    });

}


async function getData() {

    console.log("Hi");

    const user = await getUser();

    console.log(user);

}

getData();

console.log("Hello");


//? Output:
//
//? Hi
//? Hello
//? Bikas
//
//? Why?
//
//? getData() starts
//?     ↓
//? console.log("Hi")
//?     ↓
//? await getUser()
//?     ↓
//? getData() pauses
//?     ↓
//? JavaScript continues
//?     ↓
//? console.log("Hello")
//?     ↓
//? Promise resolves after 2 seconds
//?     ↓
//? getData() resumes
//?     ↓
//? console.log("Bikas")


//? IMPORTANT:
//
//? await does NOT block the JavaScript thread.
//
//? It only pauses the execution of the CURRENT async function.



// ========================================================================================


//! 3. try / catch with async-await

//? try/catch is commonly used to handle errors
//? when using async/await.

//? If the awaited Promise is rejected,
//? the rejection can be handled by catch.

function getUserWithError() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let success = true;

            if (success) {

                resolve("Success");

            } else {

                reject("User not found");

            }

        }, 2000);

    });

}


async function getUserData() {

    try {

        const user = await getUserWithError();

        console.log(user);

    } catch (error) {

        console.log(error);

    }

}

getUserData();


//? If success = true:
//
//? Success
//
//
//? If success = false:
//
//? User not found


//? Flow:
//
//? Promise fulfilled
//?       ↓
//? await gets value
//?       ↓
//? try continues
//
//? OR
//
//? Promise rejected
//?       ↓
//? await throws rejection
//?       ↓
//? catch handles error



// ========================================================================================


//! 4. Your Basic Async/Await Example

function getUser2() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let success = true;

            if (success) {

                resolve("Success");

            } else {

                reject("User not Found");

            }

        }, 2000);

    });

}


async function getData2() {

    try {

        let user = await getUser2();

        console.log(user);

    } catch (error) {

        console.log(error);

    }

}

getData2();


//? This is a correct example of:
//? Promise + async + await + try/catch.


// ========================================================================================


//! 5. Sequential Execution

//? Sequential execution means performing asynchronous operations
//? ONE after another.

//? The next operation starts only after the previous operation finishes.

//? This is useful when one operation depends on the result
//? of the previous operation.


//! Example

function getUser3() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("User");

        }, 2000);

    });

}


function getOrders(user) {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Orders for " + user);

        }, 2000);

    });

}


function getOrderDetails(orders) {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Details of " + orders);

        }, 2000);

    });

}


async function sequentialExample() {

    const user = await getUser3();

    console.log(user);

    const orders = await getOrders(user);

    console.log(orders);

    const details = await getOrderDetails(orders);

    console.log(details);

}

sequentialExample();


//? Execution:
//
//? getUser3()
//?     ↓
//? User
//?     ↓
//? getOrders(user)
//?     ↓
//? Orders
//?     ↓
//? getOrderDetails(orders)
//?     ↓
//? Details


//? If:
//
//? getUser3()         → 2 seconds
//? getOrders()        → 2 seconds
//? getOrderDetails()  → 2 seconds
//
//? Total ≈ 6 seconds.
//
//? Why?
//
//? Because each operation depends on the previous result.



// ========================================================================================


//! 6. Parallel Execution

//? Parallel execution means starting multiple independent
//? asynchronous operations without waiting for one to finish
//? before starting the others.

//? Promise.all() is commonly used with async/await
//? to handle independent operations in parallel.


//! Example

function getUser4() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("User");

        }, 2000);

    });

}


function getProducts() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Products");

        }, 3000);

    });

}


function getNotifications() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Notifications");

        }, 1000);

    });

}


async function parallelExample() {

    const [
        user,
        products,
        notifications
    ] = await Promise.all([

        getUser4(),
        getProducts(),
        getNotifications()

    ]);

    console.log(user);
    console.log(products);
    console.log(notifications);

}

parallelExample();


//? Execution:
//
//? getUser4()          → 2 seconds
//? getProducts()       → 3 seconds
//? getNotifications()  → 1 second
//
//? All three operations are started together.
//
//? Total ≈ 3 seconds.
//
//? The slowest operation takes 3 seconds.
//
//
//? Timeline:
//
//? 0s
//? │
//? ├── getUser4() ───────────── 2s
//? │
//? ├── getProducts() ─────────────────── 3s
//? │
//? └── getNotifications() ── 1s
//?                                      ↓
//?                                    Done



// ========================================================================================


//! 7. Sequential vs Parallel

//? Sequential:
//
//? const user = await getUser();
//? const products = await getProducts();
//? const orders = await getOrders();


//? Timeline:
//
//? getUser
//?    ↓
//? getProducts
//?    ↓
//? getOrders
//
//? Total time ≈
//? user + products + orders



//? Parallel:
//
//? const [user, products, orders] = await Promise.all([
//?     getUser(),
//?     getProducts(),
//?     getOrders()
//? ]);


//? Timeline:
//
//? getUser       ────────────┐
//? getProducts   ────────────┤
//? getOrders     ────────────┤
//?                            ↓
//?                         Complete
//
//? Total time ≈ slowest operation.



// ========================================================================================


//! 8. When Should We Use Sequential Execution?

//? Use sequential execution when the next operation
//? depends on the previous operation.

//! Example:

async function sequentialData() {

    const user = await getUser3();

    const orders = await getOrders(user);

    const details = await getOrderDetails(orders);

}


//? Here:
//
//? getOrders(user)
//
//? needs the result of:
//
//? getUser3()
//
//? Therefore, they cannot be started independently.


//? Dependency:
//
//? getUser()
//?    ↓
//? user
//?    ↓
//? getOrders(user)
//?    ↓
//? orders
//?    ↓
//? getOrderDetails(orders)



// ========================================================================================


//! 9. When Should We Use Parallel Execution?

//? Use parallel execution when multiple operations
//? are independent of each other.

//! Example:

async function parallelData() {

    const [user, products, notifications] = await Promise.all([

        getUser4(),
        getProducts(),
        getNotifications()

    ]);

}


//? Here:
//
//? getUser4()
//? getProducts()
//? getNotifications()
//
//? do not depend on each other.
//
//? Therefore, they can start together.



// ========================================================================================


//! 10. Error Handling with Promise.all() + async/await

//? Promise.all() can be combined with try/catch.

function getFailedProducts() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            reject("Products API failed");

        }, 2000);

    });

}


async function loadData() {

    try {

        const [user, products] = await Promise.all([

            getUser4(),
            getFailedProducts()

        ]);

        console.log(user);
        console.log(products);

    } catch (error) {

        console.log("Error:", error);

    }

}

loadData();


//? If any Promise inside Promise.all() rejects:
//
//? Promise.all()
//?       ↓
//? Rejected Promise
//?       ↓
//? await
//?       ↓
//? catch
//?       ↓
//? Error



// ========================================================================================


//! 11. async/await vs Promise then/catch

//? Promise chaining:

getUser3()
    .then((user) => {

        return getOrders(user);

    })
    .then((orders) => {

        return getOrderDetails(orders);

    })
    .then((details) => {

        console.log(details);

    })
    .catch((error) => {

        console.log(error);

    });


//? Same logic using async/await:

async function getData3() {

    try {

        const user = await getUser3();

        const orders = await getOrders(user);

        const details = await getOrderDetails(orders);

        console.log(details);

    } catch (error) {

        console.log(error);

    }

}


//? async/await does NOT replace Promises.
//
//? async/await is a cleaner syntax for working with Promises.



// ========================================================================================


//! 12. Important Rules

//? Rule 1:
//
//? An async function ALWAYS returns a Promise.


//? Rule 2:
//
//? await is used to get the result of a Promise.


//? Rule 3:
//
//? await pauses the current async function,
//? NOT the entire JavaScript thread.


//? Rule 4:
//
//? A rejected Promise can be handled using try/catch
//? when using await.


//? Rule 5:
//
//? Use sequential await when operations depend on each other.


//? Rule 6:
//
//? Use Promise.all() when independent operations
//? can run concurrently.


//? Rule 7:
//
//? Promise.all() rejects if any input Promise rejects.



// ========================================================================================


//! Interview Questions

//? Q1. What does an async function return?
//
//? Answer:
//? An async function always returns a Promise.


//? Q2. What does await do?
//
//? Answer:
//? await pauses the execution of the current async function
//? until the Promise settles.


 //? Q3. Does await block JavaScript?
//
//? Answer:
//? No.
//? It pauses only the current async function.
//? The JavaScript thread can continue executing other work.


//? Q4. How do you handle errors with async/await?
//
//? Answer:
//? Use try/catch.


//? Q5. When should you use Promise.all()?
//
//? Answer:
//? When multiple asynchronous operations are independent
//? and can be started concurrently.


//? Q6. What is sequential execution?
//
//? Answer:
//? Running asynchronous operations one after another,
//? usually because one operation depends on the previous result.


//? Q7. What is parallel/concurrent execution?
//
//? Answer:
//? Starting independent asynchronous operations without
//? unnecessarily waiting for each one to finish before
//? starting the next.



// ========================================================================================


//! Final Memory Trick

//? async
//? ↓
//? Function returns Promise


//? await
//? ↓
//? Pause current async function


//? try/catch
//? ↓
//? Handle rejected Promise


//? Sequential
//? ↓
//? One operation after another
//? Use when there is dependency


//? Parallel
//? ↓
//? Independent operations together
//? Use Promise.all()


// ========================================================================================


//! Most Important Example

async function main() {

    try {

        //? Independent operations → Parallel

        const [user, products, notifications] = await Promise.all([

            getUser4(),
            getProducts(),
            getNotifications()

        ]);

        console.log(user);
        console.log(products);
        console.log(notifications);

    } catch (error) {

        console.log("Something went wrong:", error);

    }

}

main();


//? This single example demonstrates:
//
//? async
//? await
//? Promise
//? Promise.all()
//? Parallel execution
//? try/catch
//? Error handling