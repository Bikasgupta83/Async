//! ============================================
//! JAVASCRIPT GENERATORS
//! ============================================


//? ==================================================
//? 1. What is a Generator?
//? ==================================================

//? A Generator is a special type of function that
//? can pause its execution and resume it later.

//? Generator functions are declared using *:
//
//? function* functionName() {
//
//? }

//? Inside a generator, `yield` is used to pause
//? the function and return a value.

//? Calling the generator function does NOT execute
//? the function immediately.

//? Instead, it returns a Generator Object.


//? ==================================================
//? 2. Basic Generator Example
//? ==================================================

function* test() {

    console.log("Step 1");

    yield "A";

    console.log("Step 2");

    yield "B";

    console.log("Step 3");

    yield "C";

    console.log("Finished");
}

const gen = test();


//? The function has not started executing yet.

// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());


//? Output:
//
//? Step 1
//? { value: "A", done: false }
//
//? Step 2
//? { value: "B", done: false }
//
//? Step 3
//? { value: "C", done: false }
//
//? Finished
//? { value: undefined, done: true }


//? Important:
//
//? next() starts/resumes the generator.
//
//? yield pauses the generator.
//
//? When next() is called again, execution continues
//? from where the previous yield paused.


//? ==================================================
//? 3. Understanding next()
//? ==================================================

//? next() returns an object:
//
//? {
//?     value: valueReturnedByYield,
//?     done: false
//? }

//? When the generator has finished:
//
//? {
//?     value: undefined,
//?     done: true
//? }


//? Example:

function* numbers() {

    yield 10;
    yield 20;
    yield 30;
}

let numGen = numbers();

// console.log(numGen.next());
// console.log(numGen.next());
// console.log(numGen.next());
// console.log(numGen.next());


//? Output:
//
//? { value: 10, done: false }
//? { value: 20, done: false }
//? { value: 30, done: false }
//? { value: undefined, done: true }


//? ==================================================
//? 4. Generator State
//? ==================================================

//? A generator can be in different states:
//
//? 1. Suspended Start
//? 2. Suspended Yield
//? 3. Completed


function* stateExample() {

    yield "First";

    yield "Second";

    yield "Third";
}

let stateGen = stateExample();


//? Initially:
//
//? Generator has not started.

// console.log(stateGen.next());

//? Generator is now paused at first yield.

// console.log(stateGen.next());

//? Generator is now paused at second yield.

// console.log(stateGen.next());

//? Generator is now paused at third yield.

// console.log(stateGen.next());

//? Generator is completed.


//? ==================================================
//? 5. Infinite Generator
//? ==================================================

//? Generators are useful for creating infinite sequences
//? because values are generated only when requested.


function* counter() {

    let count = 1;

    while (true) {

        yield count;

        count++;
    }
}

let CounterGenerator = counter();

// console.log(CounterGenerator.next());
// console.log(CounterGenerator.next());
// console.log(CounterGenerator.next());
// console.log(CounterGenerator.next());
// console.log(CounterGenerator.next());


//? Output:
//
//? { value: 1, done: false }
//? { value: 2, done: false }
//? { value: 3, done: false }
//? { value: 4, done: false }
//? { value: 5, done: false }


//? The generator does NOT create infinite numbers
//? in memory.
//
//? It creates the next number only when next()
//? is called.


//? ==================================================
//? 6. Sending Data into a Generator
//? ==================================================

//? next(value) can send a value into the generator.
//
//? The value passed to next() becomes the result
//? of the previous yield expression.


function* calculator() {

    let a = yield "Enter first number";

    let b = yield "Enter Second number";

    return a + b;
}

let calculatorGen = calculator();


//? First next() starts the generator.
//
// console.log(calculatorGen.next());


//? "10" is sent into the generator.
//
// console.log(calculatorGen.next(10));


//? "15" is sent into the generator.
//
// console.log(calculatorGen.next(15));


//? Output:
//
//? { value: "Enter first number", done: false }
//? { value: "Enter Second number", done: false }
//? { value: 25, done: true }


//? IMPORTANT:
//
//? The first next(value) value is ignored.
//
//? Example:
//
//? calculatorGen.next(10);
//
//? Since the generator has not reached a yield yet,
//? there is nowhere to receive 10.


//? ==================================================
//? 7. Generator with Arrays
//? ==================================================

function* arrayGenerator(arr) {

    for (let item of arr) {

        yield item;
    }
}

let arr = [10, 20, 30, 40];

let arrGen = arrayGenerator(arr);

console.log(arrGen.next());
console.log(arrGen.next());
console.log(arrGen.next());
console.log(arrGen.next());
console.log(arrGen.next());


//? Output:
//
//? { value: 10, done: false }
//? { value: 20, done: false }
//? { value: 30, done: false }
//? { value: 40, done: false }
//? { value: undefined, done: true }


//? ==================================================
//? 8. Generator with for...of
//? ==================================================

//? Generators are iterable.
//
//? Therefore, we can directly use them with
//? for...of.


function* fruits() {

    yield "Apple";
    yield "Banana";
    yield "Mango";
}

let fruitGen = fruits();

for (let fruit of fruitGen) {

    console.log(fruit);
}


//? Output:
//
//? Apple
//? Banana
//? Mango


//? ==================================================
//? 9. yield*
//? ==================================================

//? yield* is used to delegate execution to another
//? generator or iterable.


function* vegetables() {

    yield "Potato";
    yield "Tomato";
}

function* food() {

    yield "Apple";

    yield* vegetables();

    yield "Mango";
}

let foodGen = food();

for (let item of foodGen) {

    console.log(item);
}


//? Output:
//
//? Apple
//? Potato
//? Tomato
//? Mango


//? yield* basically means:
//
//? "Yield all values from this generator/iterable."


//? ==================================================
//? 10. Generator for Fibonacci
//? ==================================================

//? Generators can be combined with DSA concepts.


function* fibonacci() {

    let a = 0;
    let b = 1;

    while (true) {

        yield a;

        let next = a + b;

        a = b;
        b = next;
    }
}

let fib = fibonacci();

console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);
console.log(fib.next().value);


//? Output:
//
//? 0
//? 1
//? 1
//? 2
//? 3
//? 5


//? ==================================================
//? 11. Generator return()
//? ==================================================

//? return() immediately stops the generator.
//
//? It can also return a custom value.


function* returnExample() {

    yield 1;

    yield 2;

    yield 3;
}

let returnGen = returnExample();

console.log(returnGen.next());

console.log(returnGen.return("Generator stopped"));

console.log(returnGen.next());


//? Output:
//
//? { value: 1, done: false }
//
//? { value: "Generator stopped", done: true }
//
//? { value: undefined, done: true }


//? After return(), the generator cannot continue.


//? ==================================================
//? 12. Generator throw()
//? ==================================================

//? throw() throws an error inside the generator.
//
//? The generator can catch the error using try...catch.


function* errorGenerator() {

    try {

        yield "Start";

        yield "Middle";

    } catch (error) {

        console.log("Error:", error.message);
    }
}

let errorGen = errorGenerator();

console.log(errorGen.next());

console.log(
    errorGen.throw(new Error("Something went wrong"))
);


//? Output:
//
//? { value: "Start", done: false }
//? Error: Something went wrong
//? { value: undefined, done: true }


//? ==================================================
//? 13. Generator with try...finally
//? ==================================================

//? Generators can also use finally.
//
//? finally executes when the generator is closed.


function* cleanupGenerator() {

    try {

        yield 1;
        yield 2;
        yield 3;

    } finally {

        console.log("Cleanup completed");
    }
}

let cleanupGen = cleanupGenerator();

console.log(cleanupGen.next());

console.log(cleanupGen.return());


//? Output:
//
//? { value: 1, done: false }
//? Cleanup completed
//? { value: undefined, done: true }


//? ==================================================
//? 14. Generator for IDs
//? ==================================================

function* idGenerator() {

    let id = 1001;

    while (true) {

        yield id++;

    }
}

let generateId = idGenerator();

console.log(generateId.next().value);
console.log(generateId.next().value);
console.log(generateId.next().value);


//? Output:
//
//? 1001
//? 1002
//? 1003


//? ==================================================
//? 15. Generator as an Iterator
//? ==================================================

//? Every generator object is an iterator.
//
//? An iterator must have a next() method.


function* iteratorExample() {

    yield "A";
    yield "B";
    yield "C";
}

let iterator = iteratorExample();

console.log(typeof iterator.next);

//? Output:
//
//? function


//? ==================================================
//? 16. Generator + Spread Operator
//? ==================================================

//? Since generators are iterable, we can use
//? the spread operator.


function* letters() {

    yield "A";
    yield "B";
    yield "C";
}

let letterGen = letters();

let lettersArray = [...letterGen];

console.log(lettersArray);


//? Output:
//
//? ["A", "B", "C"]


//? ==================================================
//? 17. Generator + Array Destructuring
//? ==================================================

function* values() {

    yield 10;
    yield 20;
    yield 30;
}

let valueGen = values();

let [first, second, third] = valueGen;

console.log(first);
console.log(second);
console.log(third);


//? Output:
//
//? 10
//? 20
//? 30


//? ==================================================
//? 18. Generator vs Normal Function
//? ==================================================


//? Normal function:
//
//? function test() {
//?     return 1;
//?     return 2;
//? }
//
//? Only 1 is returned because return immediately
//? terminates the function.


//? Generator:
//
//? function* test() {
//?     yield 1;
//?     yield 2;
//? }
//
//? Generator can pause and resume multiple times.


//? Normal Function:
//
//? Call → Execute completely → Return


//? Generator:
//
//? Call → Pause → Resume → Pause → Resume → Finish


//? ==================================================
//? 19. Important Generator Methods
//? ==================================================


//? next()
//
//? Starts or resumes the generator.
//
//? Example:
//
//? gen.next()


//? return()
//
//? Stops the generator.
//
//? Example:
//
//? gen.return()


//? throw()
//
//? Throws an error inside the generator.
//
//? Example:
//
//? gen.throw(new Error("Error"))


//? ==================================================
//? 20. Generator Summary
//? ==================================================


//? function*
//
//? Used to create a generator function.


//? yield
//
//? Pauses the generator and returns a value.


//? next()
//
//? Resumes the generator.


 //? next(value)
//
//? Sends a value into the generator.


 //? return()
//
//? Immediately terminates the generator.


 //? throw()
//
//? Throws an error inside the generator.


 //? yield*
//
//? Delegates values to another generator/iterable.


//? done
//
//? false → generator still has values
//
//? true → generator has finished


//? ==================================================
//? MAIN IDEA
//? ==================================================


//? Generator:
//
//? function* generator() {
//
//?     yield 1;
//?     yield 2;
//?     yield 3;
//
//? }


//? Execution:
//
//? generator()
//?      ↓
//? next()
//?      ↓
//? yield 1
//?      ↓
//? next()
//?      ↓
//? yield 2
//?      ↓
//? next()
//?      ↓
//? yield 3
//?      ↓
//? next()
//?      ↓
//? done = true


//? ==================================================
//? WHY USE GENERATORS?
//? ==================================================


//? 1. Lazy evaluation
//? 2. Generate values one at a time
//? 3. Memory efficient for large sequences
//? 4. Create custom iterators
//? 5. Infinite sequences
//? 6. Control execution flow
//? 7. Useful with iteration protocols