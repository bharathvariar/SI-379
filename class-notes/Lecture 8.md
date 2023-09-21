---
Date: 2023-09-21
tags:
  - UMich
  - SI379
  - javascript
  - html
---
# Scope (Part 1)
## Global Scope
- Variables declared outside of any function have global scope
- Can be used anywhere in the program
- Global scope is shared across files
## Local Scope
### Block Scope
- Variables declared (with `let` or `const`) inside of a block have local scope
    - A block is a set of statements surrounded by curly braces (`{...}`)
    - Can only be used inside the block
- Local scope is not shared across files
- Note: `var` does not have block scope
```javascript
const x = 1; // global scope
if(x > 0) {
    const y = 2; // local scope
    console.log(y); // 2
}
console.log(x); // 1
console.log(y); // ReferenceError: y is not defined
```
```javascript
const x = 1; // global scope
if (x > 0) {
    const y = 2; // local scope
    console.log(y); // 2
    if(y > 0) {
        const z = 3; // local scope
        console.log(z); // 3
    }
    console.log(z); // ReferenceError: z is not defined
}
console.log(x); // 1
console.log(y); // ReferenceError: y is not defined
```
- Local variables get re-defined every time the block is executed
```javascript
for(const item of [1, 2, 3]) {
    const x = item; // local scope, re-defined every time
    console.log(x); // 1, 2, 3
    // no error even though the variable was declared as const
}
```
### Function Scope (`var`)
- Variables declared with `var` inside of a function have function scope.
- Can only be used inside the function (but not scoped to the block it was declared in).
```javascript
function foo() {
    const x = 1; // local scope
    if(x > 0) {
        var y = 2; // function scope
        const z = 3; // local scope
        console.log(x); // 1
        console.log(y); // 2
        console.log(z); // 2
    }
    console.log(y); // 2 THIS IS VISIBLE(!)
    console.log(z); // ReferenceError: z is not defined
}
```
## Objects in JavaScript
- Objects are a collection of key-value pairs
- Just like a dictionary in Python
```javascript
const person = {
    'name': 'Bob',
    'age': 21,
    'isStudent': true
};
```
```javascript
const fruit = [
    {'id': 'apple', 'price': '6'},
    {'id': 'banana', 'price': '8'},
    {'id': 'pear', 'price': '10'}
    ];
```
- This is an arrry of *objects*.
### Objects vs. Dictionaries
- Can omit quotes around keys (but not values) in JavaScript:
```javascript
const person = {
	name: 'Bob',
	age: 21,
	'isStudent': true
};
```
- Can use dot notation or square brackets to access values:
```javascript
console.log(person.name); // Bob
console.log(person["age"]); // 21
console.log(person.isStudent); // true
// ...MUTATING OBJECTS:
person.isStudent = false; // change value
person["age"]++; // change value
```
## Random Questions
### 1. Difference between `let`, `var` and `const`:
- `let` allows variables to be reassigned and mutated.
- `var` is like `let` but is function-scoped.
- `const` creates variables that *cannot* be reassinged but *can* be mutated.
### 2. What is the DOM and how can it be manipulated:
- The DOM is the tree of objects that are rendered on webpages.
- The DOM is manipulated using HTML and JavaScript.
- `document.querySelector()` is the JavaScript object used to access the DOM elements.
### 3. What is the output of the following code:
```javascript
function func_A() { console.log("A"); }
function func_B() { console.log("B"); }
function func_C() { console.log("C"); }
function func_D() { console.log("D"); }
function func_E() { console.log("E"); }
setTimeout(func_A, 1000);
setTimeout(func_B, 0);
func_C();
setTimeout(func_D, 1000);
```
- The output will be:
	C
	B
	A
	D
- `func_C()` is the first to run cuz it is called immedietely.
- `setTimeout(fun, 0)` -> Even though the timer set off immedietely, it will wait for everything in the run-queue to finish before adding the callback function to the run-queue.
- Timer for all functions are added and started together in JavaScript. And it is added after the entire script has been run.
- Queue: sT(A), sT(B), C, sT(D), B, A, D
### 4. Why does the following code produce the error "`Uncaught TypeError: can't access property "addEventListener", btn is null`" ?
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<script>
		const btn = document.getElementById("my-button");
		btn.addEventListener("click", () => {
		alert('You clicked the button!');
		});
	</script>
</head>
<body>
	<button id="my-button">Click me!</button>
</body>
</html>
```
- The Script looks for the element before it has been created since it runs first. So `getElementById` returns a `null` object for `btn`.
### 5. What is the difference between a "class" in HTML and an "id"? Where should you use them? How do you select the elements with a specific class in CSS? How do you select the elements with a specific class in JavaScript? How do you select the elements with a specific id in CSS? How do you select the elements with a specific id in JavaScript?
- ID is supposed to be specific, but classes are meant to be a broader set of elements.
- Selecting class in `CSS`: `.<class-name>`
- Selecting class in `JavaScript`: `document.querySelector('.<class-name>')`
- Selecting id in `CSS`: `#<id-name>`
- Selecting id in `JavaScript`: `document.querySelector('#<id-name>')`
---