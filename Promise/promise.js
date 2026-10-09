//! Promise Basics

//? A Promise represents the eventual result of an asynchronous operation.

//? A Promise has three states:
//? 1. Pending    -> Operation is still running
//? 2. Fulfilled  -> Operation completed successfully
//? 3. Rejected   -> Operation failed


//! Creating a Promise

function getUser() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            let success = true;

            if (success) {

                let user = {
                    name: "Bikas",
                    id: 101
                };

                resolve(user);

            } else {

                reject("Something went wrong");

            }

        }, 2000);
    });
}


//! Using the Promise

getUser()
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });


//? If success = true:
//? Promise: Pending → Fulfilled
//? resolve(user) → .then() receives the user


//? If success = false:
//? Promise: Pending → Rejected
//? reject(error) → .catch() receives the error



// ----------------------------------------------------------------------------------------


//! then

//? .then() is used to handle a fulfilled Promise.

//? .then() receives the value passed to resolve().

//? Example:
//? resolve(user)
//?       ↓
//? .then((user) => {})


//? IMPORTANT:
//? .then() always returns a NEW Promise.


// Example:

const promise1 = Promise.resolve(10);

const promise2 = promise1.then((value) => {

    console.log(value);

    return value * 2;

});

console.log(promise2);


//? promise1
//?     ↓
//? .then()
//?     ↓
//? return 20
//?     ↓
//? promise2


// ----------------------------------------------------------------------------------------


//! Return Value from then

Promise.resolve(10)
    .then((value) => {

        return value * 2;

    })
    .then((value) => {

        console.log(value);

    });


//? Output:
//? 20


//? The value returned from one .then()
//? becomes the value received by the next .then().


//? Flow:
//
//? Promise.resolve(10)
//?        ↓
//?      .then()
//?        ↓
//?    return 20
//?        ↓
//?      .then()
//?        ↓
//?       20



// ----------------------------------------------------------------------------------------


//! No Return from then

Promise.resolve(10)
    .then((value) => {

        console.log(value);

        // No return

    })
    .then((value) => {

        console.log(value);

    });


//? Output:
//? 10
//? undefined


//? If a .then() callback does not return anything,
//? it returns undefined.

//? Therefore, the next .then() receives undefined.



// ----------------------------------------------------------------------------------------


//! catch

//? .catch() is used to handle a rejected Promise.

//? reject(error)
//?      ↓
//? .catch((error) => {})


function getUserError() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            reject("User not found");

        }, 2000);

    });
}

getUserError()
    .then((user) => {

        console.log(user);

    })
    .catch((error) => {

        console.log(error);

    });


//? Output after 2 seconds:
//? User not found



// ----------------------------------------------------------------------------------------


//! finally

//? .finally() runs whether the Promise is fulfilled or rejected.

//? It is commonly used for cleanup operations.

//? Example:

getUser()
    .then((user) => {

        console.log(user);

    })
    .catch((error) => {

        console.log(error);

    })
    .finally(() => {

        console.log("Promise completed");

    });


//? If successful:
//
//? user
//? Promise completed


//? If rejected:
//
//? error
//? Promise completed



// ----------------------------------------------------------------------------------------


//! Promise Chaining

//? Multiple .then() methods can be chained together.

//? The returned value from one .then()
//? becomes the input of the next .then().

Promise.resolve(10)

    .then((value) => {

        console.log(value);

        return value * 2;

    })

    .then((value) => {

        console.log(value);

        return value + 5;

    })

    .then((value) => {

        console.log(value);

    });


//? Output:
//? 10
//? 20
//? 25


//? Flow:
//
//? 10
//? ↓
//? 10 * 2
//? ↓
//? 20
//? ↓
//? 20 + 5
//? ↓
//? 25



// ----------------------------------------------------------------------------------------


//! Returning a Promise from then

//? A .then() can return another Promise.

//? The next .then() waits for that Promise
//? to settle and receives its result.

Promise.resolve(10)

    .then((value) => {

        return new Promise((resolve) => {

            setTimeout(() => {

                resolve(value * 2);

            }, 2000);

        });

    })

    .then((value) => {

        console.log(value);

    });


//? Output after approximately 2 seconds:
//? 20


//? Flow:
//
//? 10
//? ↓
//? .then()
//? ↓
//? Promise
//? ↓
//? wait
//? ↓
//? resolve(20)
//? ↓
//? next .then()
//? ↓
//? 20



// ----------------------------------------------------------------------------------------


//! Error Propagation

//? If an error occurs inside a .then(),
//? the returned Promise becomes rejected.

//? The rejection moves down the chain
//? until a .catch() handles it.

Promise.resolve("Start")

    .then((value) => {

        console.log(value);

        throw new Error("Something went wrong");

    })

    .then((value) => {

        // This will NOT execute

        console.log("Next then");

    })

    .catch((error) => {

        console.log(error.message);

    });


//? Output:
//? Start
//? Something went wrong


//? Flow:
//
//? Promise
//?   ↓
//? .then()
//?   ↓
//? throw Error
//?   ↓
//? Rejected Promise
//?   ↓
//? next .then() skipped
//?   ↓
//? .catch()
//?   ↓
//? Error handled



// ----------------------------------------------------------------------------------------


//! Promise.resolve()

//? Promise.resolve() creates a fulfilled Promise
//? from a normal value.

const promise = Promise.resolve("Hello");

promise.then((value) => {

    console.log(value);

});


//? Output:
//? Hello



// ----------------------------------------------------------------------------------------


//! Promise.reject()

//? Promise.reject() creates an already rejected Promise.

const rejectedPromise = Promise.reject("Something went wrong");

rejectedPromise.catch((error) => {

    console.log(error);

});


//? Output:
//? Something went wrong



// ----------------------------------------------------------------------------------------


//! Important Promise Rules

//? 1. Promise has three states:
//
//? Pending
//? Fulfilled
//? Rejected


//? 2. Promise can settle only once.
//
//? Pending → Fulfilled
//? OR
//? Pending → Rejected


//? 3. resolve(value) fulfills the Promise.


//? 4. reject(error) rejects the Promise.


//? 5. .then() handles fulfillment.


//? 6. .catch() handles rejection.


//? 7. .finally() runs after the Promise settles.


//? 8. .then() always returns a new Promise.


//? 9. Returning a value from .then()
//? passes that value to the next .then().


//? 10. If .then() doesn't return anything,
//? the next .then() receives undefined.


//? 11. Returning a Promise from .then()
//? makes the chain wait for that Promise.


//? 12. Throwing an error inside .then()
//? creates a rejected Promise.

// ----------------------------------------------------------------------------------------