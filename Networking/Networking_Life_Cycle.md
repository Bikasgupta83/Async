# HTTP Request Lifecycle

## Overview

When we use the Fetch API:

``` js
const response = await fetch("https://dummyjson.com/products");
```

a lot happens behind the scenes before `response` becomes available.

### High-Level Flow

``` text
fetch()
  ↓
URL parsing
  ↓
DNS lookup
  ↓
Network connection
  ↓
TLS/HTTPS handshake
  ↓
HTTP request
  ↓
Server processes request
  ↓
HTTP response
  ↓
Browser receives response
  ↓
fetch() Promise fulfills
  ↓
Response object
  ↓
response.json()
  ↓
JavaScript data
```

------------------------------------------------------------------------

# 1. `fetch()` Starts the Process

When we write:

``` js
fetch("https://dummyjson.com/products");
```

the browser receives a URL.

The URL contains different parts:

``` text
https://dummyjson.com/products
   ↓          ↓             ↓
protocol    domain        path
```

-   `https://` → protocol
-   `dummyjson.com` → domain
-   `/products` → path

The browser uses this information to determine where and how to send the
request.

------------------------------------------------------------------------

# 2. DNS Lookup

The browser needs an IP address to communicate with the server.

Humans use domain names:

``` text
dummyjson.com
```

Computers communicate using IP addresses.

DNS means:

> **Domain Name System**

DNS translates a domain name into an IP address.

``` text
dummyjson.com
      ↓
     DNS
      ↓
 IP address
```

### Simple analogy

DNS is like the internet's phonebook:

``` text
Name → Phone Number
```

Similarly:

``` text
Domain Name → IP Address
```

> The actual IP address can change, so we should not memorize a specific
> IP as the permanent address of a domain.

------------------------------------------------------------------------

# 3. DNS Caching

DNS information can be cached.

Therefore, the browser may not need to perform a fresh DNS lookup every
time.

``` text
First request:

dummyjson.com
      ↓
DNS lookup
      ↓
IP address
```

Later:

``` text
dummyjson.com
      ↓
DNS cache
      ↓
IP address
```

Caching can exist at multiple layers, not only in the browser.

------------------------------------------------------------------------

# 4. Network Connection

After finding the server's IP address, the browser needs a network
connection.

For traditional HTTP/1.1 and HTTP/2 connections, TCP is commonly used.

Conceptually:

``` text
Browser
   ↓
Network connection
   ↓
Server
```

TCP provides reliable and ordered delivery of data.

When using:

``` js
fetch()
```

we normally do not manually create TCP connections. The browser handles
this networking layer.

> Modern HTTP can also use newer protocols. HTTP/3 uses QUIC rather than
> TCP.

------------------------------------------------------------------------

# 5. TLS and HTTPS

If the URL starts with:

``` text
https://
```

the communication is secured using TLS.

High-level flow:

``` text
Network connection
       ↓
TLS handshake
       ↓
Encrypted HTTPS communication
```

TLS helps provide:

-   Encryption
-   Server authentication
-   Data integrity

This is why HTTPS is important when sending sensitive information over a
network.

------------------------------------------------------------------------

# 6. HTTP Request

After the connection is ready, the browser sends an HTTP request.

A simplified GET request might look like:

``` http
GET /products HTTP/1.1
Host: dummyjson.com
Accept: application/json
```

When using Fetch, we don't normally write this raw HTTP message.

We write:

``` js
fetch("https://dummyjson.com/products");
```

and the browser handles the networking details.

------------------------------------------------------------------------

# 7. HTTP Methods

An HTTP request contains a method.

Common HTTP methods are:

``` text
GET
POST
PUT
PATCH
DELETE
```

### GET

Used to retrieve data:

``` js
fetch("/products");
```

### POST

Commonly used to create/send data:

``` js
fetch("/products", {
    method: "POST"
});
```

### PUT

Commonly used to replace/update a resource.

### PATCH

Commonly used to partially update a resource.

### DELETE

Used to delete a resource.

------------------------------------------------------------------------

# 8. Request Headers

HTTP requests can contain headers.

Example:

``` js
fetch("/users", {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        name: "Bikas"
    })
});
```

The request can contain:

``` text
Request
│
├── Method
│   └── POST
│
├── URL
│   └── /users
│
├── Headers
│   └── Content-Type: application/json
│
└── Body
    └── JSON data
```

### Common Headers

#### Content-Type

Tells the server what format the request body uses.

``` http
Content-Type: application/json
```

#### Accept

Tells the server what response format the client prefers.

``` http
Accept: application/json
```

#### Authorization

Can contain authentication information when an API requires it.

``` http
Authorization: Bearer YOUR_TOKEN
```

> Real secrets and private API credentials should not be exposed
> directly in frontend JavaScript.

------------------------------------------------------------------------

# 9. Request Reaches the Server

The request travels through the network:

``` text
Browser
   ↓
Internet / Network
   ↓
Server
```

For a MERN application, the request might reach an Express/Node.js
server.

For example:

``` js
app.get("/api/products", (req, res) => {
    res.json(products);
});
```

The server receives a request such as:

``` text
GET /api/products
```

and executes the appropriate backend logic.

------------------------------------------------------------------------

# 10. Server Processes the Request

The server might perform several operations:

``` text
Receive request
      ↓
Authenticate user
      ↓
Validate input
      ↓
Run business logic
      ↓
Query database
      ↓
Create response
```

For a MERN application:

``` text
React
  ↓
fetch()
  ↓
Express / Node.js
  ↓
MongoDB
  ↓
Express / Node.js
  ↓
HTTP Response
  ↓
React
```

Example:

``` js
app.get("/api/products", async (req, res) => {

    const products = await Product.find();

    res.json(products);

});
```

------------------------------------------------------------------------

# 11. HTTP Response

After processing the request, the server sends an HTTP response.

A simplified response could look like:

``` http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "products": [...]
}
```

An HTTP response contains information such as:

``` text
Response
│
├── Status
│   └── 200
│
├── Headers
│   └── Content-Type: application/json
│
└── Body
    └── JSON data
```

------------------------------------------------------------------------

# 12. HTTP Status Codes

Some common status codes are:

  Status   Meaning
  -------- -----------------------
  `200`    OK
  `201`    Created
  `204`    No Content
  `400`    Bad Request
  `401`    Unauthorized
  `403`    Forbidden
  `404`    Not Found
  `500`    Internal Server Error

------------------------------------------------------------------------

# 13. What Does `fetch()` Receive?

When the browser receives the response:

``` js
const response = await fetch(url);
```

`response` is a **Response object**.

We can access information such as:

``` js
console.log(response.status);
console.log(response.ok);
console.log(response.headers);
```

For a successful response, we might get:

``` text
200
true
Headers
```

Important:

> The `Response` object is not yet the parsed JSON data.

------------------------------------------------------------------------

# 14. `response.json()`

To read a JSON response body:

``` js
const data = await response.json();
```

`response.json()`:

1.  Reads the response body.
2.  Parses the body as JSON.
3.  Returns a Promise.

The flow is:

``` text
HTTP Response
      ↓
Response object
      ↓
response.json()
      ↓
Read response body
      ↓
Parse JSON
      ↓
JavaScript value
```

For example, the server might send:

``` json
{
    "name": "Bikas",
    "age": 25
}
```

Then:

``` js
const data = await response.json();

console.log(data.name);
```

Output:

``` text
Bikas
```

------------------------------------------------------------------------

# 15. Complete Fetch Example

``` js
async function getProducts() {

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

getProducts();
```

Behind this simple code:

``` text
getProducts()
      ↓
fetch()
      ↓
Parse URL
      ↓
DNS lookup
      ↓
Network connection
      ↓
TLS / HTTPS
      ↓
HTTP request
      ↓
Server
      ↓
Backend processing
      ↓
HTTP response
      ↓
Response object
      ↓
response.json()
      ↓
JavaScript data
```

------------------------------------------------------------------------

# 16. Where Does the Promise Fit?

`fetch()` returns a Promise.

``` js
const result = fetch(url);
```

Conceptually:

``` text
fetch()
   ↓
Promise
   ↓
HTTP request
   ↓
Response arrives
   ↓
Promise fulfills
   ↓
Response object
```

Then:

``` js
const data = await response.json();
```

also involves a Promise:

``` text
response.json()
       ↓
Promise
       ↓
Response body is read
       ↓
JSON is parsed
       ↓
JavaScript data
```

------------------------------------------------------------------------

# 17. Does `fetch()` Block JavaScript?

No.

Consider:

``` js
async function getData() {

    console.log("Start");

    const response = await fetch(url);

    console.log("Data received");

}

getData();

console.log("Other JavaScript");
```

High-level execution:

``` text
Start
  ↓
fetch()
  ↓
await
  ↓
getData() pauses
  ↓
Other JavaScript
  ↓
Network response arrives
  ↓
getData() resumes
  ↓
Data received
```

`await` pauses the execution of that async function, not the entire
JavaScript thread.

The browser can continue handling other work while the network request
is pending.

------------------------------------------------------------------------

# 18. HTTP Error vs Network Error

This is important when using Fetch.

## HTTP Error

The server responded, but the response represents an error.

Examples:

``` text
400
401
403
404
500
```

`fetch()` generally still fulfills with a `Response` object.

Therefore:

``` js
if (!response.ok) {
    throw new Error(
        `HTTP Error: ${response.status}`
    );
}
```

## Network Error

The request could not be completed normally.

In such situations, the Fetch Promise can reject.

Example error handling:

``` js
try {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `HTTP Error: ${response.status}`
        );
    }

    const data = await response.json();

} catch (error) {

    console.log(error);

}
```

------------------------------------------------------------------------

# 19. MERN Example

Suppose React sends:

``` js
const response = await fetch(
    "http://localhost:5000/api/products"
);

const products = await response.json();

setProducts(products);
```

The high-level flow is:

``` text
React Browser
      │
      │ fetch()
      ↓
HTTP Request
      │
      ↓
Express Server
      │
      ↓
Route / Controller
      │
      ↓
MongoDB
      │
      ↓
Database Result
      │
      ↓
Express Server
      │
      ↓
HTTP Response
      │
      ↓
Browser
      │
      ↓
response.json()
      │
      ↓
JavaScript Data
      │
      ↓
React State
      │
      ↓
UI
```

This is the basic request/response cycle you will repeatedly use when
building MERN applications.

------------------------------------------------------------------------

# 20. HTTP vs HTTPS

### HTTP

``` text
http://example.com
```

### HTTPS

``` text
https://example.com
```

HTTPS uses TLS to secure HTTP communication.

A simplified HTTPS flow is:

``` text
HTTP
  ↓
TLS security
  ↓
HTTPS
```

------------------------------------------------------------------------

# 21. HTTP/1.1, HTTP/2 and HTTP/3

For learning the basic lifecycle, you can remember:

``` text
DNS
 ↓
Network connection
 ↓
TLS
 ↓
HTTP
```

However, modern web networking has multiple protocols.

-   HTTP/1.1 commonly uses TCP.
-   HTTP/2 commonly uses TCP.
-   HTTP/3 uses QUIC over UDP.

Therefore, avoid saying:

> Every HTTP request always uses TCP.

A better statement is:

> The browser resolves the domain through DNS, establishes the
> appropriate network and security connection, sends the HTTP request,
> and receives the HTTP response.

------------------------------------------------------------------------

# 22. Complete HTTP Request Lifecycle

``` text
                  USER CODE
                     │
                     ↓
                  fetch()
                     │
                     ↓
                 Parse URL
                     │
                     ↓
                 DNS Lookup
                     │
                     ↓
             Find Server Address
                     │
                     ↓
           Establish Connection
          (TCP/QUIC as applicable)
                     │
                     ↓
              TLS for HTTPS
                     │
                     ↓
               HTTP Request
                     │
                     ↓
                   SERVER
                     │
               ┌─────┴─────┐
               ↓           ↓
            Backend     Database
               │           │
               └─────┬─────┘
                     ↓
               HTTP Response
                     │
                     ↓
                  Browser
                     │
                     ↓
              fetch() Promise
                     │
                     ↓
              Response Object
                     │
                     ↓
            response.json()
                     │
                     ↓
              JavaScript Data
                     │
                     ↓
                  React/UI
```

------------------------------------------------------------------------

# 23. Interview Questions

## Q1. What happens after calling `fetch()`?

**Answer:**

`fetch()` returns a Promise. At a high level, the browser resolves the
domain through DNS, establishes the required network/security
connection, sends the HTTP request, and receives an HTTP response. The
Promise then provides a `Response` object.

------------------------------------------------------------------------

## Q2. What is DNS?

**Answer:**

DNS stands for Domain Name System. It translates domain names into IP
addresses so the browser can locate the appropriate server.

------------------------------------------------------------------------

## Q3. What does `fetch()` return?

**Answer:**

`fetch()` returns a Promise that fulfills with a `Response` object when
a response is received.

------------------------------------------------------------------------

## Q4. What does `response.json()` do?

**Answer:**

`response.json()` asynchronously reads the response body and parses it
as JSON. It returns a Promise.

------------------------------------------------------------------------

## Q5. Does `fetch()` reject for a 404?

**Answer:**

Normally, no. A 404 is an HTTP response from the server, so the Fetch
Promise can still fulfill with a Response object. We should check
`response.ok` or `response.status`.

------------------------------------------------------------------------

## Q6. Does `await fetch()` block the JavaScript thread?

**Answer:**

No. `await` pauses the current async function until the Promise settles,
but it does not block the entire JavaScript thread.

------------------------------------------------------------------------

## Q7. What is the difference between HTTP and HTTPS?

**Answer:**

HTTPS is HTTP secured using TLS. It provides encrypted communication and
helps authenticate the server and protect data integrity.

------------------------------------------------------------------------

# 24. Quick Memory Trick

Remember:

``` text
URL
 ↓
DNS
 ↓
Connection
 ↓
TLS
 ↓
HTTP Request
 ↓
Server
 ↓
HTTP Response
 ↓
Response Object
 ↓
response.json()
 ↓
JavaScript Data
```

And for MERN:

``` text
React
 ↓
Fetch
 ↓
HTTP
 ↓
Express
 ↓
MongoDB
 ↓
Express
 ↓
HTTP Response
 ↓
React
 ↓
UI
```

------------------------------------------------------------------------

# Key Takeaways

-   `fetch()` is used to make HTTP requests.
-   `fetch()` returns a Promise.
-   DNS resolves a domain name to an IP address.
-   The browser establishes the appropriate network connection.
-   HTTPS uses TLS for secure communication.
-   The browser sends an HTTP request to the server.
-   The server processes the request and may interact with a database.
-   The server sends an HTTP response.
-   `fetch()` gives us a `Response` object.
-   `response.json()` reads and parses a JSON response body.
-   `response.json()` also returns a Promise.
-   `fetch()` does not normally reject just because the server returns
    `4xx` or `5xx`.
-   Check `response.ok` or `response.status` for HTTP errors.
-   `await` pauses an async function, not the entire JavaScript thread.
