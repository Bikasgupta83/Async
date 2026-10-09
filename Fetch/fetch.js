//! ===============================================
//!                  FETCH API
//! ===============================================

//? Fetch API is a browser API used to make HTTP requests
//? and communicate with servers over a network.

//? fetch() returns a Promise.

//? When the server responds, the Promise is fulfilled
//? with a Response object.

//? IMPORTANT:
//? fetch() does NOT automatically reject for HTTP errors
//? such as 404, 401, 403 or 500.

//? We need to check:
//? response.ok
//? OR
//? response.status



//! ===============================================
//!                  FETCH SYNTAX
//! ===============================================

//? Basic syntax:
//
//? fetch(url, {
//?     method: "GET",
//?     headers: {
//?         "Content-Type": "application/json",
//?         "Authorization": "Bearer YOUR_TOKEN",
//?         "Accept": "application/json"
//?     },
//?     body: JSON.stringify(data)
//? });


//? method:
//? Specifies the HTTP method.
//
//? GET
//? POST
//? PUT
//? PATCH
//? DELETE


//? headers:
//? Contains additional information about the request.

//? Content-Type:
//? Tells the server the format of the request body.
//
//? Example:
//? "Content-Type": "application/json"


//? Authorization:
//? Used by APIs that require authentication.
//
//? Example:
//? "Authorization": "Bearer YOUR_TOKEN"


//? Accept:
//? Tells the server what response format
//? the client prefers.
//
//? Example:
//? "Accept": "application/json"


//? body:
//? Contains the data that we want to send to the server.
//
//? When sending JSON:
//
//? body: JSON.stringify(data)



//! ===============================================
//!              FETCH REQUEST FLOW
//! ===============================================

//? fetch()
//?    ↓
//? Returns Promise
//?    ↓
//? HTTP Request
//?    ↓
//? Server
//?    ↓
//? HTTP Response
//?    ↓
//? Response Object
//?    ↓
//? response.json()
//?    ↓
//? Parsed JavaScript data



//! ===============================================
//!              response.json()
//! ===============================================

//? response.json() reads the response body
//? and parses it as JSON.

//? IMPORTANT:
//? response.json() also returns a Promise.

//? Therefore, when using async/await:
//
//? const response = await fetch(url);
//? const data = await response.json();


//? Two different asynchronous operations:
//
//? fetch()
//?   ↓
//? HTTP Response
//
//? response.json()
//?   ↓
//? Parsed response data



//! ===============================================
//!         FETCH USING ASYNC / AWAIT
//! ===============================================

async function getProducts1() {

    const response = await fetch(
        "https://dummyjson.com/products"
    );

    const data = await response.json();

    console.log(data);

}

// getProducts1();



//! ===============================================
//!         FETCH USING .then()
//! ===============================================

fetch("https://dummyjson.com/products")

    .then((response) => {

        return response.json();

    })

    .then((data) => {

        console.log(data);

    })

    .catch((error) => {

        console.error(error);

    });



//? fetch()
//?    ↓
//? response
//?    ↓
//? response.json()
//?    ↓
//? data
//?    ↓
//? catch(error)



//! ===============================================
//!             HTTP ERROR HANDLING
//! ===============================================

//? fetch() does NOT automatically reject
//? when the server returns:
//
//? 400 Bad Request
//? 401 Unauthorized
//? 403 Forbidden
//? 404 Not Found
//? 500 Internal Server Error


//? Example:
//
//? fetch("https://dummyjson.com/products/999999")
//? may still resolve with a Response object.
//
//? Therefore, check response.ok.



//! ===============================================
//!       response.ok AND response.status
//! ===============================================

//? response.ok:
//? Returns true when the HTTP response
//? indicates success.
//
//? response.status:
//? Gives the HTTP status code.
//
//? Example:
//
//? 200 → OK
//? 201 → Created
//? 400 → Bad Request
//? 401 → Unauthorized
//? 403 → Forbidden
//? 404 → Not Found
//? 500 → Internal Server Error



//! ===============================================
//!        CORRECT HTTP ERROR HANDLING
//! ===============================================

async function getProducts2() {

    try {

        const response = await fetch(
            "https://dummyjson.com/pro"
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

// getProducts2();



//! ===============================================
//!             NETWORK ERROR
//! ===============================================

//? HTTP error and Network error are different.

//? HTTP Error:
//
//? Server responded.
//
//? Example:
//
//? 404
//? 500
//
//? fetch() can still resolve with a Response object.
//
//? We check:
//
//? response.ok
//? response.status


//? Network Error:
//
//? The request could not be completed normally.
//
//? In this situation fetch() can reject,
//? and catch() can handle the error.



//! ===============================================
//!                   GET
//! ===============================================

//? GET is used to retrieve/read data.

//? GET is the default fetch method.

//? Therefore:
//
//? fetch(url)
//
//? is normally equivalent to:
//
//? fetch(url, {
//?     method: "GET"
//? });

async function getData() {

    try {

        const response = await fetch(
            "https://dummyjson.com/products"
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

// getData();



//! ===============================================
//!                   POST
//! ===============================================

//? POST is commonly used to create/send data.

//? When sending JSON:
//
//? 1. Convert JavaScript object to JSON
//?    using JSON.stringify()
//
//? 2. Tell the server that the body contains JSON
//?    using Content-Type.


//? JSON.stringify()
//? Converts a JavaScript value into JSON text.

//? Example:
//
//? JSON.stringify({
//?     name: "Bikas",
//?     age: 25
//? });


//? Content-Type:
//? "Content-Type": "application/json"
//
//? Tells the server that the request body
//? contains JSON data.



async function postData() {

    try {

        const response = await fetch(
            "https://dummyjson.com/users/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    firstName: "Bikas",
                    age: 25
                })
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

// postData();



//! ===============================================
//!                    PUT
//! ===============================================

//? PUT is commonly used to replace/update
//? an entire resource.

//? PUT generally sends the updated representation
//? of a resource.

async function updateUser(idx) {

    try {

        const response = await fetch(
            `https://dummyjson.com/users/${idx}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    firstName: "Bikas",
                    age: 22
                })
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log("Updated Successfully....");

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

// updateUser(1);



//! ===============================================
//!                   PATCH
//! ===============================================

//? PATCH is commonly used to partially update
//? a resource.

//? PUT:
//? Commonly used for replacing/updating
//? the resource representation.

//? PATCH:
//? Commonly used when only specific fields
//? need to be changed.



async function patchUser(idx) {

    try {

        const response = await fetch(
            `https://dummyjson.com/users/${idx}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    firstName: "Bikas"
                })
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log("User partially updated");

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

// patchUser(1);



//! ===============================================
//!                  DELETE
//! ===============================================

//? DELETE is used to delete a resource.

//? IMPORTANT:
//? We must specify:
//
//? method: "DELETE"
//
//? Otherwise fetch() defaults to GET.



async function deleteData(idx) {

    try {

        const response = await fetch(
            `https://dummyjson.com/users/${idx}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        console.log(
            `Status: ${response.status}`
        );

        console.log(
            "Deleted Successfully...."
        );

        //? Some DELETE APIs return JSON data.
        //? If the API returns a body, it can be read using:
        //
        //? const data = await response.json();
        //? console.log(data);

    } catch (error) {

        console.log(error);

    }

}

// deleteData(1);



//! ===============================================
//!               HTTP METHODS
//! ===============================================

//? GET
//? ↓
//? Read / Retrieve data


//? POST
//? ↓
//? Create / Send data


//? PUT
//? ↓
//? Replace / Update resource


//? PATCH
//? ↓
//? Partially update resource


//? DELETE
//? ↓
//? Delete resource



//! ===============================================
//!                   HEADERS
//! ===============================================

//? Headers contain additional information
//? about the HTTP request or response.


//? Content-Type
//? ↓
//? Tells the server the format of the
//? request body.


//? Accept
//? ↓
//? Tells the server the response format
//? the client prefers.


//? Authorization
//? ↓
//? Used for authentication/authorization
//? when required by the API.



//! Example:

const requestHeaders = {

    "Content-Type": "application/json",

    "Accept": "application/json",

    "Authorization": "Bearer YOUR_TOKEN"

};


//? IMPORTANT:
//? Never expose real private API secrets
//? directly in frontend JavaScript.



//! ===============================================
//!               ABORT CONTROLLER
//! ===============================================

//? AbortController is used to cancel an asynchronous
//? operation such as a fetch request.

//? Create controller:

const controller = new AbortController();


//? Pass the signal to fetch:

//? signal: controller.signal


//? Cancel the request:

//? controller.abort()



//! ===============================================
//!          ABORT CONTROLLER EXAMPLE
//! ===============================================

const controller2 = new AbortController();

async function getProducts3() {

    try {

        const response = await fetch(
            "https://dummyjson.com/products",
            {
                signal: controller2.signal
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        if (error.name === "AbortError") {

            console.log(
                "Request was cancelled"
            );

        } else {

            console.log(
                "Something went wrong:",
                error
            );

        }

    }

}

// getProducts3();


//? To cancel the request:
//
//? controller2.abort();



//! ===============================================
//!       SEARCH REQUEST + ABORT CONTROLLER
//! ===============================================

//? AbortController is especially useful for search boxes.
//
//? Example:
//
//? User types:
//
//? Java
//? JavaS
//? JavaSc
//? JavaScr
//
//? A new request can start while the previous
//? request is still running.
//
//? We can cancel the previous request.



let searchController;


async function searchProducts(query) {

    //? Cancel previous request
    if (searchController) {

        searchController.abort();

    }


    //? Create a new controller
    searchController = new AbortController();


    try {

        const response = await fetch(
            `https://dummyjson.com/products/search?q=${query}`,
            {
                signal: searchController.signal
            }
        );

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        if (error.name === "AbortError") {

            console.log(
                "Previous search request cancelled"
            );

        } else {

            console.log(
                "Search Error:",
                error
            );

        }

    }

}


//? Example:
//
//? searchProducts("javascript");
//
//? Then if the user searches again:
//
//? searchProducts("javascript promises");
//
//? The previous request can be cancelled.



//! ===============================================
//!             COMPLETE FETCH PATTERN
//! ===============================================

//? This is a useful pattern to remember
//? when working with APIs.

async function fetchData() {

    try {

        //? 1. Send HTTP request

        const response = await fetch(
            "https://dummyjson.com/products"
        );


        //? 2. Check HTTP status

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        //? 3. Parse response body

        const data = await response.json();


        //? 4. Use data

        console.log(data);


    } catch (error) {

        //? 5. Handle errors

        console.log(
            "Something went wrong:",
            error
        );

    }

}


// fetchData();



//! ===============================================
//!            FETCH IMPORTANT POINTS
//! ===============================================

//? 1. fetch() returns a Promise.


//? 2. await fetch() gives a Response object.


//? 3. response.json() returns a Promise.


//? 4. await response.json()
//?    gives parsed JavaScript data.


//? 5. fetch() does NOT automatically reject
//?    for HTTP 4xx or 5xx responses.


//? 6. Use response.ok or response.status
//?    to check HTTP errors.


//? 7. GET is the default fetch method.


//? 8. POST is commonly used to create/send data.


//? 9. PUT is commonly used to replace/update
//?    a resource.


//? 10. PATCH is commonly used to partially update
//?     a resource.


//? 11. DELETE is used to delete a resource.


//? 12. JSON.stringify()
//?     converts JavaScript data into JSON text.


//? 13. Content-Type:
//?     tells the server the request body format.


//? 14. Accept:
//?     tells the server what response format
//?     the client prefers.


//? 15. Authorization:
//?     provides authentication/authorization
//?     information when required.


//? 16. AbortController can cancel fetch requests.



//! ===============================================
//!            FETCH REQUEST FLOW
//! ===============================================

//?                    fetch(url)
//?                         ↓
//?                      Promise
//?                         ↓
//?                  HTTP Request
//?                         ↓
//?                      Server
//?                         ↓
//?                  HTTP Response
//?                         ↓
//?                 Response Object
//?                         ↓
//?              check response.ok
//?                         ↓
//?               response.json()
//?                         ↓
//?                      Promise
//?                         ↓
//?                JavaScript Object
//?                         ↓
//?                    Use Data



//! ===============================================
//!              CRUD + HTTP METHODS
//! ===============================================

//? CRUD:
//
//? C → Create → POST
//? R → Read   → GET
//? U → Update → PUT / PATCH
//? D → Delete → DELETE



//! ===============================================
//!             INTERVIEW QUESTIONS
//! ===============================================

//? Q1. What does fetch() return?
//
//? Answer:
//? fetch() returns a Promise that fulfills with
//? a Response object when a response is received.


//? Q2. Why do we use response.json()?
//
//? Answer:
//? response.json() reads the response body
//? and parses it as JSON.
//? It returns a Promise.


//? Q3. Why doesn't a 404 automatically reject fetch()?
//
//? Answer:
//? Because 404 is a valid HTTP response from the server.
//? fetch() generally rejects only when the request itself
//? cannot be completed normally, such as certain network failures.


//? Q4. How do you handle HTTP errors?
//
//? Answer:
//
//? if (!response.ok) {
//?     throw new Error(`HTTP Error: ${response.status}`);
//? }


//? Q5. What is the difference between PUT and PATCH?
//
//? PUT:
//? Commonly replaces/updates the resource representation.
//
//? PATCH:
//? Commonly modifies only selected fields.


//? Q6. Why use JSON.stringify()?
//
//? Answer:
//? It converts a JavaScript value into JSON text,
//? which can be sent as a JSON request body.


//? Q7. Why use Content-Type?
//
//? Answer:
//? It tells the server what format the request body uses.


//? Q8. What is AbortController?
//
//? Answer:
//? It allows us to cancel an ongoing operation,
//? such as a fetch request.



//! ===============================================
//!              FINAL MEMORY TRICK
//! ===============================================

//? fetch()
//? ↓
//? HTTP Request
//? ↓
//? Response
//? ↓
//? response.json()
//? ↓
//? Data


//? GET    → Read
//? POST   → Create
//? PUT    → Replace / Update
//? PATCH  → Partial Update
//? DELETE → Delete


//? response.ok
//? ↓
//? Check HTTP success


//? JSON.stringify()
//? ↓
//? JS data → JSON text


//? AbortController
//? ↓
//? Cancel fetch request