//! setTimeout()

const hello = () => {
    console.log("hello");
};

console.log("start");

const timeoutId = setTimeout(hello, 2000);

console.log("end");


//! clearTimeout()

// clearTimeout(timeoutId);


//! setInterval()

const intervalId = setInterval(() => {
    console.log("Hello from interval");
}, 2000);


//! clearInterval()

setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval stopped");
}, 10000);