//! Promise Combinators

//? Promise Combinators are methods used to work with
//? multiple Promises at the same time.
//
//? The four important Promise Combinators are:
//
//? 1. Promise.all()
//? 2. Promise.allSettled()
//? 3. Promise.race()
//? 4. Promise.any()


// ========================================================================================


//! 1. Promise.all()

//? Promise.all() is used when we want to run multiple Promises
//? in parallel and need ALL of them to be fulfilled.

//? If ALL Promises are fulfilled:
//?     Promise.all() → fulfilled
//
//? If even ONE Promise is rejected:
//?     Promise.all() → rejected
//
//? This behavior is called "fail-fast".


//! Basic Example

let p1 = Promise.resolve("User");
let p2 = Promise.resolve("Orders");
let p3 = Promise.resolve("Products");

Promise.all([p1, p2, p3])
    .then((result) => {

        console.log(result);

    });


//? Output:
//
//? ["User", "Orders", "Products"]


//? IMPORTANT:
//? Promise.all() returns the results in the SAME ORDER
//? as the Promises were passed into the array.
//
//? It does NOT matter which Promise finishes first.
//
//? Example:
//
//? p1 → takes 3 seconds
//? p2 → takes 1 second
//? p3 → takes 2 seconds
//
//? Promise.all([p1, p2, p3])
//? will still return:
//
//? [result of p1, result of p2, result of p3]



// ========================================================================================


//! Destructuring Promise.all() Result

//? If we want to store each result in separate variables,
//? we can use array destructuring.

Promise.all([p1, p2, p3])
    .then(([user, order, product]) => {

        console.log(user);
        console.log(product);
        console.log(order);

    });


//? Output:
//
//? User
//? Products
//? Orders


//? Notice:
//
//? [user, order, product]
//
//? follows the order:
//
//? p1 → user
//? p2 → order
//? p3 → product



// ========================================================================================


//! Promise.all() with Different Execution Times

function getUser() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve("User");

        }, 2000);

    });

}


function getProducts() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve("Products");

        }, 1000);

    });

}


function getUserOrder() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            resolve("User Order");

        }, 3000);

    });

}


Promise.all([
    getUser(),
    getProducts(),
    getUserOrder()
])
    .then((result) => {

        console.log(result);

    });


//? Output after approximately 3 seconds:
//
//? ["User", "Products", "User Order"]


//? Why approximately 3 seconds?
//
//? getUser()       → 2 seconds
//? getProducts()   → 1 second
//? getUserOrder()  → 3 seconds
//
//? Promise.all() waits for ALL of them.
//
//? Therefore, the total time is approximately
//? the time taken by the slowest operation.
//
//? 3 seconds


//? IMPORTANT:
//? Promise.all() starts the independent Promises together.
//? It does NOT wait for the first Promise to finish
//? before starting the second one.



// ========================================================================================


//! Promise.all() - One Promise Fails

let promise1 = Promise.resolve("User");
let promise2 = Promise.reject("Failed");
let promise3 = Promise.resolve("Products");


Promise.all([promise1, promise2, promise3])
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    });


//? Output:
//
//? Failed


//? Because promise2 is rejected.
//
//? Promise.all() follows:
//
//? Success + Success + Success
//?             ↓
//?          Fulfilled
//
//? Success + Failure + Success
//?             ↓
//?           Rejected


//? IMPORTANT:
//? Promise.all() is useful when ALL results are required.
//
//? Example:
//
//? Get user
//? Get user permissions
//? Get user settings
//
//? If any required operation fails,
//? we may want the whole operation to fail.



// ========================================================================================


//! 2. Promise.allSettled()

//? Promise.allSettled() waits for ALL Promises to finish,
//? whether they are fulfilled OR rejected.
//
//? Unlike Promise.all(),
//? Promise.allSettled() does NOT fail immediately
//? when one Promise rejects.
//
//? It collects the result of EVERY Promise.


//! Example

let all1 = Promise.resolve("User");
let all2 = Promise.reject("Failed");
let all3 = Promise.resolve("Products");


Promise.allSettled([all1, all2, all3])
    .then((result) => {

        console.log(result);

    });


//? Output:
//
//? [
//?     {
//?         status: "fulfilled",
//?         value: "User"
//?     },
//?     {
//?         status: "rejected",
//?         reason: "Failed"
//?     },
//?     {
//?         status: "fulfilled",
//?         value: "Products"
//?     }
//? ]


//? Every result contains a "status".
//
//? If fulfilled:
//
//? {
//?     status: "fulfilled",
//?     value: ...
//? }
//
//? If rejected:
//
//? {
//?     status: "rejected",
//?     reason: ...
//? }



// ========================================================================================


//! Accessing allSettled() Results

Promise.allSettled([all1, all2, all3])
    .then((result) => {

        console.log(result);

        return result;

    })
    .then((result) => {

        console.log("User Value:", result[0].value);

        console.log("Failed Reason:", result[1].reason);

        console.log("Product Value:", result[2].value);

    });


//? Output:
//
//? User Value: User
//? Failed Reason: Failed
//? Product Value: Products


//? IMPORTANT:
//? Before accessing .value or .reason,
//? we should ideally check the status.
//
//? Example:

Promise.allSettled([all1, all2, all3])
    .then((results) => {

        results.forEach((result) => {

            if (result.status === "fulfilled") {

                console.log("Success:", result.value);

            } else {

                console.log("Failed:", result.reason);

            }

        });

    });


//? This is safer because a rejected result does not have
//? a meaningful "value", and a fulfilled result does not
//? have a meaningful "reason".



// ========================================================================================


//! Promise.all() vs Promise.allSettled()

//? Promise.all():
//
//? ALL must be fulfilled.
//? One rejection → overall Promise rejects.
//? Fail-fast.
//
//
//? Promise.allSettled():
//
//? Waits for ALL Promises to settle.
//? Success and failure are both collected.
//? Does not fail because one input rejected.


//? Easy way to remember:
//
//? Promise.all()
//?     → ALL must succeed
//
//? Promise.allSettled()
//?     → ALL must finish



// ========================================================================================


//! 3. Promise.race()

//? Promise.race() returns the result of the
//? FIRST Promise that settles.
//
//? "Settled" means:
//
//? Fulfilled OR Rejected


//! Example

let race1 = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("Promise 1");

    }, 3000);

});


let race2 = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("Promise 2");

    }, 2000);

});


let race3 = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("Promise 3");

    }, 1000);

});


Promise.race([race1, race2, race3])
    .then((result) => {

        console.log(result);

    });


//? Output:
//
//? Promise 3
//
//? Because:
//
//? Promise 1 → 3 seconds
//? Promise 2 → 2 seconds
//? Promise 3 → 1 second
//
//? Promise 3 settles first.



// ========================================================================================


//! Promise.race() - First Rejection

//? Promise.race() does NOT care whether the first
//? Promise fulfills or rejects.
//
//? It simply takes the FIRST settled Promise.

const racePromise1 = new Promise((resolve, reject) => {

    setTimeout(() => {

        reject("Server 1 Failed");

    }, 1000);

});


const racePromise2 = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("Server 2 Success");

    }, 3000);

});


Promise.race([racePromise1, racePromise2])
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log("Error:", error);

    });


//? Output:
//
//? Error: Server 1 Failed
//
//? Because Server 1 rejected after 1 second,
//? before Server 2 fulfilled after 3 seconds.



// ========================================================================================


//! Promise.race() - Timeout Pattern

//? Promise.race() can be used to implement a timeout.
//
//? We race:
//
//? API Request
//?       VS
//? Timeout


const apiRequest = fetch("https://dummyjson.com/products");


const timeout = new Promise((resolve, reject) => {

    setTimeout(() => {

        reject("Request Timeout");

    }, 5000);

});


Promise.race([
    apiRequest,
    timeout
])
    .then((response) => {

        console.log(response);

    })
    .catch((error) => {

        console.log("Error:", error);

    });


//? If API responds before 5 seconds:
//
//? API → wins
//
//? If 5 seconds finishes before API:
//
//? Timeout → wins


//? IMPORTANT:
//? Promise.race() does NOT cancel the losing Promise.
//
//? For real fetch request cancellation,
//? AbortController is generally preferred.



// ========================================================================================


//! 4. Promise.any()

//? Promise.any() returns the FIRST Promise that fulfills.
//
//? Rejected Promises are ignored while waiting
//? for a successful Promise.
//
//? It is useful when we have multiple alternative
//? sources and only need ONE successful result.


//! Example

const anyPromise1 = new Promise((resolve, reject) => {

    setTimeout(() => {

        reject("Server 1 Failed");

    }, 1000);

});


const anyPromise2 = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("Server 2 Success");

    }, 3000);

});


const anyPromise3 = new Promise((resolve, reject) => {

    setTimeout(() => {

        resolve("Server 3 Success");

    }, 2000);

});


Promise.any([
    anyPromise1,
    anyPromise2,
    anyPromise3
])
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    });


//? Output:
//
//? Server 3 Success
//
//? Timeline:
//
//? 1 second → Server 1 rejects ❌
//? 2 seconds → Server 3 fulfills ✅
//? 3 seconds → Server 2 fulfills ✅
//
//? Promise.any() ignores Server 1's rejection
//? and returns Server 3 because it is the
//? first Promise to successfully fulfill.



// ========================================================================================


//! Promise.any() - All Promises Fail

Promise.any([
    Promise.reject("Error 1"),
    Promise.reject("Error 2"),
    Promise.reject("Error 3")
])
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    });


//? If ALL Promises reject,
//? Promise.any() rejects with an AggregateError.
//
//? AggregateError contains the errors
//? from all rejected Promises.
//
//? Example:
//
//? error.errors
//
//? may contain:
//
//? ["Error 1", "Error 2", "Error 3"]



// ========================================================================================


//! Promise.race() vs Promise.any()

//? This is VERY important for interviews.


//? Promise.race():
//
//? FIRST SETTLED Promise wins.
//
//? Fulfilled → wins
//? Rejected  → wins


//? Promise.any():
//
//? FIRST FULFILLED Promise wins.
//
//? Fulfilled → wins
//? Rejected  → ignored


//? Example:
//
//? P1 → Reject after 1 second
//? P2 → Fulfill after 2 seconds


//? Promise.race():
//? P1 wins because it settled first.
//? Result → Rejected


//? Promise.any():
//? P1 is ignored.
//? P2 eventually fulfills.
//? Result → Fulfilled



// ========================================================================================


//! All Four Promise Combinators

//? Promise.all()
//
//? Wait for ALL.
//? One rejection → reject.
//? Use when ALL results are required.


//? Promise.allSettled()
//
//? Wait for ALL.
//? Collect success AND failure.
//? Use when every result matters.


//? Promise.race()
//
//? First SETTLED wins.
//? Fulfilled OR rejected can win.
//? Useful for timeout patterns.


//? Promise.any()
//
//? First FULFILLED wins.
//? Rejections are ignored until everything rejects.
//? Useful when we have multiple alternative sources.


// ========================================================================================


//! Easy Way to Remember

//? Promise.all()
//? → ALL must succeed


//? Promise.allSettled()
//? → ALL must finish


//? Promise.race()
//? → FIRST to finish


//? Promise.any()
//? → FIRST to succeed



// ========================================================================================


//! Comparison Table

//? -----------------------------------------------------------------------------
//? | Combinator          | What does it wait for?       | Failure behavior    |
//? -----------------------------------------------------------------------------
//? | Promise.all()       | All fulfilled                | One reject → reject |
//? | Promise.allSettled()| All settled                 | Never fail-fast     |
//? | Promise.race()      | First settled               | First result wins   |
//? | Promise.any()       | First fulfilled             | All reject → reject |
//? -----------------------------------------------------------------------------


// ========================================================================================


//! Interview Questions

//? Q1. What is Promise.all()?
//? Promise.all() runs multiple Promises together and fulfills
//? only when all input Promises are fulfilled.
//? If one rejects, the returned Promise rejects.


//? Q2. Does Promise.all() execute Promises sequentially?
//? No. Independent Promises can be started concurrently.
//? Promise.all() waits for their results.


 //? Q3. Does Promise.all() preserve order?
//? Yes.
//? Results are returned in the same order as the input Promises,
//? regardless of which Promise finishes first.


//? Q4. What is Promise.allSettled()?
//? It waits for every Promise to settle and returns
//? the status and result of each Promise.


//? Q5. Difference between Promise.all() and allSettled()?
//? Promise.all() rejects when any input rejects.
//? Promise.allSettled() waits for all and reports every outcome.


//? Q6. What does Promise.race() return?
//? The result of the first Promise to settle,
//? whether fulfilled or rejected.


//? Q7. What does Promise.any() return?
//? The result of the first Promise to fulfill.
//? Rejections are ignored until all Promises reject.


//? Q8. What happens if every Promise passed to Promise.any()
//? rejects?
//? Promise.any() rejects with an AggregateError.


//? Q9. What is the biggest difference between race() and any()?
//? race() → first SETTLED
//? any()  → first FULFILLED


// ========================================================================================


//! Final Memory Trick

//? ALL
//?     ↓
//? ALL must succeed


//? ALL SETTLED
//?     ↓
//? ALL must finish


//? RACE
//?     ↓
//? FIRST to finish


//? ANY
//?     ↓
//? FIRST to succeed