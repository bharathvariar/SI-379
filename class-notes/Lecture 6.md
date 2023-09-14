---
Date: 2023-09-14
tags:
  - UMich
  - SI379
  - javascript
  - python
  - css
  - html
---
# JavaScript Practice and Deploying Pages
## JavaScript Booleans
- Python: `True` and `False`
- JavaScript: `true` and `false`
## JavaScript Values `null` and `undefined`
- Python has `none`
- JavaScript has `null` and `undefined`
	- `undefined`: For declared variables that have no values yet.
	```javascript
	let x; // value: undefined
	function f(); // return value: undefined
	```
	- `null`: For declared variables that have the value of 'nothing'
	```javascript
	let x = null; // null  
	const el = document.querySelector("#nonexistent-element"); // null
	```
## JavaScript Equality Checking: == and ===
```javascript
console.log(1 == "1"); // true  
console.log(1 === "1"); // false  
```
```javascript
console.log(null == undefined); // true  
console.log(null === undefined); // false
```
```JavaScript
console.log(0 == false); // true  
console.log(0 === false); // false
```
```javascript
[] == 0;
[] == "";  
"5" == [5];
```
In conclusion, use triple equals ( === and !== ) for equality checking .
## JavaScript Blocks
- We use `{...}` to define blocks
- We can omit `{}` if the block has only one line but can be erroneous.
```javascript
let x = 2, y = 5;
if (x > y)
	x = y;
	y = x;
// Result: x = 2, y = 2
// Even though the y = x line looks like it is in the if block, it isnt cuz javascript doesn't care about indentation
```
```javascript
if (false)                                                         1
	console.log("This should not print") //But it prints. Why?
```
- The above `console.log()` runs because
	- the absence of curly braces confuses the compiler. 
	- It sees the 1 at the very end of the line and considers that as the only line in the `if` block and hence runs the `console.log()` always
## `for` Loops in JavaScript
### Looping over Arrays
```javascript
const arr = [1, 2, 3];
for (const num of arr) {
	//num is 1, then 2 and then 3
}
```
### Looping over Dictionaries/Objects
```javascript
const dict = {1: 'a', 2: 'b', 3: 'c'};
for (const key in dict) {
	//key is 1, then 2 and then 3
}
```
### Traditional Loops
```javascript
for (let i = 0; i < 5; i++) {
	// i = 0, 1, 2, 3, 4 (in that order)
}
```
## Embedding JavaScript in `<head>..</head>`
```html
<head>
	<script src="main.js" defer></script>
</head>
```
- The `defer` keyword, downloads the JavaScript script but doesn't run it till the page loads. 
```html
<html>  
	<head>  
		<script src="main.js" async></script>  
	</head>  
	<body>  
		<p>Hello world!</p>  
	</body>  
</html>
```
- `async` executes script as soon as possible. This may or may not work in the given context.
## Selectors in CSS
```css
#box {
	width: 250px; 
	height: 250px;
	background-color: grey;
}

.red-box {
	background-color: red;
}
```
```html
<div id="box" class="red-box"></div>
```
- In the above snippet since there are two different values for the same attribute (`background-color`), `CSS` will choose the 'more specific' description, which in this case will be `#box` since `id` is typically meant to be only for one element.
### Workarounds
1. We can use the `!important` keyword to force matters, but this isn't recommended.
```css
#box { background-color: grey; }  
.red-box { background-color: red !important; }
```
2. We can make the selector more specific.
```css
#box { background-color: grey; }  
#box.red-box { background-color: red; }  
```
`#box.red-box` : Element with ID box **and** class red-box (Note: no spaces between `id` and `class`)
### Combining Selectors
- `.a.b` : 
	- Element with class `a` **and** class `b` 
	- No space between the selectors  
- `.a .b` : 
	- Element with class `b` **inside** element with class `a`  
	- Space between the selectors
## JavaScript String Template Literals
- The *backtick* character creates "template literal" strings. 
- Inside, we can add `${ ... }` and include the value of `"..."` in the string:  
```javascript
const x = 1;  
console.log(`x is ${x}`); // "x is 1"  
const x = 1;  
const y = 10;  
console.log(`x + y is ${x + y}`); // "x + y is 11"
```
---