---
Date: 2023-10-19
tags:
  - "#SI379"
  - "#UMich"
  - "#javascript"
---
# Recap
- Lecture 12: Timer
- Lecture 13: Mid-term practice
- Lecture 14: Mid-term
# Promises and `async`, `await`
## Promises
- An object that *promises* to have a value in the future.
- Think of a promise as an empty box that will be filled later.
- A promise has 3 possible states:
	1. Pending: Box is empty.
	2. Fulfilled: Box is filled as promised.
	3. Rejected: Box will never be filled due to some error.
### Creating Promises
- Promises aren't usually created manually, but this is how it's done.
- In JavaScript, we need to use the `new` keyword to create new objects. 
```javascript
const promiseObject = new Promise((resolve, reject) => {
	// do something
	// if successful, call resolve() -> (1)
	// else, call reject() -> (2)
	// Resolve with value "hello" aafter 5 seconds
	setTimeout(() => {
		resolve("hello");
	}, 5000);
});
console.log(promiseObject);
```
1. Enters *"fulfilled"* state and value is whatever we call resolve() with. For example, `resolve(5)` would put 5 in the box.
2. Enters *"rejected"* state.
### Creating a Promise Using `fetch()`
```javascript
// Using the `fetch()` function to fetch data from any website.
const fetchPromise = fetch("https://events.umich.edu/day/json?v=2");
});
```
### `.then()`
```javascript
promiseObject.then((value) => {
	// when the promiseObject is resolved, 'then' call this call back fucntion
	console.log(value);
});
fetchPromise.then((value) => {
	console.log(value);
})
```
### But why Promises?
- Consider the example where 5 different functions depend on the same value
- with *"standard"* callbacks , we need to *"push"* the value to each callback by calling them all.
``` javaScript
asyncFunction((value) => {  
	callback1(value);  
	callback2(value);  
	callback3(value);  	
	callback4(value);  
	callback5(value);
});
```
- With promises, we can *"pull"* the value instead.
```JavaScript
const promiseObject = asyncPromiseFunction();  
function callback1(value) { promiseObject.then(...); }  
function callback2(value) { promiseObject.then(...); }  
function callback3(value) { promiseObject.then(...); }
function callback4(value) { promiseObject.then(...); }  
function callback5(value) { promiseObject.then(...); } 
```
- With "standard" callbacks, we need to "push" the values to each callback by calling them all.
- Now suppose we have five callbacks that depend on the same three values.
```javascript
asyncFunction1((value1) => {  
	asyncFunction2((value2) => {  
		asyncFunction3((value3) => {  
			callback1(value1, value2, value3);  
			callback2(value1, value2, value3);  
			callback3(value1, value2, value3);  
			callback4(value1, value2, value3);  
			callback5(value1, value2, value3);  
		});  
	});  
});
```
- The "callback hell" or "pyramid of doom" ^ can cause errors and very difficult to debug. 
- With promises, we can "pull" the values instead.
```javascript
const promiseObject1 = asyncPromiseFunction1();  
const promiseObject2 = asyncPromiseFunction2();  
const promiseObject3 = asyncPromiseFunction3();  
function callback1(value1, value2, value3) {  
	//reference promiseObject1, promiseObject2, promiseObject3  
}  
function callback2(value1, value2, value3) {  
	//reference promiseObject1, promiseObject2, promiseObject3  
}  
function callback3(value1, value2, value3) {  
	//reference promiseObject1, promiseObject2, promiseObject3  
}  
// ... 
```
- But there's more! We can "chain" promises together!  
	- `.then()` returns a new promise that is fulfilled when the original promise is fulfilled.
	- If the callback passed to `.then()` returns a value, the new promise is fulfilled with that value.
	- If the callback passed to `.then()` returns a promise, the new promise is fulfilled when that promise is fulfilled.
- End result: we can chain promises together.
```javascript
const promiseObject1 = asyncPromiseFunction1();  
const promiseObject2 = promiseObject1.then((value1) => {  
	return asyncPromiseFunction2(value1);  
});  
const promiseObject3 = promiseObject2.then((value2) => {  
	return asyncPromiseFunction3(value2);  
});
```
- `fetch()` returns a promise, so we can chain it together with `.then()`.
```javascript
const promiseObject = fetch("https://events.umich.edu/day/json?v=2"); // returns a Promise  
const jsonPromise = promiseObject.then((value) => {  
	console.log(value); // prints the response object  
	const jsonValue = value.json(); // returns a Promise  
	return jsonValue;  
});  
jsonPromise.then((value) => {  
	console.log(value); // prints the JSON object  
});
```
```javascript
fetch("https://events.umich.edu/day/json?v=2")  
	.then((response) => response.json())  
	.then((value) => {  
		console.log(value);  
	});
``` 
## Staring `problem-set-4`: Printing out Questions
```javascript
const fetchPromise = fetch('https://the-trivia-api.com/v2/questions');
const jsonP = fetchPromise.then((response) => {
    const jsonPromise = response.json();
    console.log(jsonPromise);
    return jsonPromise;
});
jsonP.then((data) => {
    console.log(data);
});
```
- But the above code is a bit too verbose, and instead we can write just this:
```javascript
fetch('https://the-trivia-api.com/v2/questions')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});
```
## A Small Syntax Lesson
```javascript
fetch('https://the-trivia-api.com/v2/questions')
	.then((response) => response.json();)
```
- The return is implicit here.

## `async()` And `await()`
- If we declare a function that returns a promise, we can use `async`/`await` to make it look like synchronous code.
- `async` keyword before a function declaration means that the function returns a   `promise`.  
- `await` keyword before a promise means that the promise should be fulfilled before continuing.
```javascript
async function myFunction() {  
	const value1 = await asyncPromiseFunction1();  
	const value2 = await asyncPromiseFunction2(value1);  
	const value3 = await asyncPromiseFunction3(value2);  
	return value3;  
}
```
- Example: Using `async`/`await` with `fetch()`  
```javascript
function getUMichEvents() {  
	fetch("https://events.umich.edu/day/json?v=2")  
		.then((response) => response.json() )  
		.then((value) => {  
			console.log(value);  
		});
};
``` 
can convert to:  
```javascript
async function getUMichEvents() {  
	const response = await fetch("https://events.umich.edu/day/json?v=2");  
	const value = await response.json();  
	console.log(value);  
}
```
- Example: Using `async`/`await` with a manual promise.
```javascript
function pausePromise(ms) {  
	return new Promise((resolve, reject) => {  
		setTimeout(resolve, ms)  
	});  
}  
async function myFunction() {  
	console.log("before");  
	await pausePromise(5000);  
	console.log("after");
}
```
## Other Promise Methods
- `Promise.all([p1, p2, p3])` - Returns a new promise that is fulfilled when all of the promises in the array ( `[p1, p2, p3] `) are fulfilled.
- `Promise.any([p1, p2, p3])` - Returns a new promise that is fulfilled when any of  the promises in the array ( `[p1, p2, p3]` ) are fulfilled.
- `Promise.resolve(value)` - Returns a new promise that is immediately fulfilled with the given value.
---
