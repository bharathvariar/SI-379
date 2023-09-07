---
Date: 2023-09-05
tags:
  - UMich
  - SI379
  - javascript
  - python
  - html
---
# The DOM and JavaScript Basics
## The Document Object Model (DOM)
- Its a #tree that represents structure of web-page
- It is *dynamic* and *mutable*
- Writing HTML creates and CSS styles the DOM (by the browser)
- Similar for CSS -> CSSOM
## Differences from Python
### JavaScript Interpreting Code
- #JavaScript is permissive and forgiving whereas #python throws errors for just about anything!
- JS figures out what to do with your code whereas python will throw an error if it doesn't know what to do
```javascript
arr = [1, 2, 3]; //Js array is the same as a python list
to_add = 4;
new_arr = arr + to_add;
console.log(new_arr); // o/p: "1,2,34"
console.log(new_arr.length); // 6
```
- The above example shows why JavaScript isn't exactly the best cuz of it's "interpretation".
### Declaring Variables
```python
x = 10 # this is prefectly valid code
```
```javascript
let x = 10; // We need to declare variables when creating them
const y = 20; // unecessary while reassigning
```
 - Although it's not necessary but it can cause unexpected  errors down the line. 
 - ```let``` allows the variable to be reassigned. 
- ```const``` variables cannot be reassigned.
```javascript
let x = 5;
x = 20 //x = 20 now
const y = 6;
y = 100; //error
```
- However, even ```const``` variables can be mutated. 
```Javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1, 2, 3, 4]
```
- We can also declare variables using ```var``` but it's old and don't use it.
- **Tip:** Use ```const``` whenever possible unless you are sure the the variable needs to be reassigned down the line. 
- While JavaScript requires semi-colons at the end of statements, it's not absolutely necessary and forgetting it isn't a big deal. 
### Differences between ```console.log``` and ```print```
- ```console.log``` only shows up in the developer tools and does not affect the webpage in anyway. 
- ```console.log``` is only for the programmers, helps debug.
### Code Blocks
- Python code blocks are defined by indentation whereas JavaScript delineates code blocks using curly braces and indentation is used only for readability. 
### Comments
- Python comments are preceded by '#' whereas JavaScript comments are preceded by '//' and multi-line comments are enclosed withing '/\* \*/'

## JavaScript for Web-dev

```html
<DOCTYPE html>
<html>
	<head>
		<style>
			p {
				color: blue;
			}
		</style>
	</head>
	<body>
		<p> This is a paragraph </p>
		<p id = my-paragraph> This is another paragraph </p>
	</body>
</html>
```
### Accessing the DOM Using JavaScript
- returns element with the given query parameters. 
```javascript
const elem = document.querySelector("p") // querying all paragraph elems
console.log(elem.innerHTML) // "this is a paragraph" (content in elem)
elem.innerHTML = "Hello World!"
console.log(elem.innerHTML) // "Hello World!"

// Also lookup: getElementsByTagName('p')

const elems = document.querySelectorAll('p') // returns a list of all elements of given type

const elem = document.querySelector("#my-paragraph") // Querying by id
```
### Mixing in JavaScript
1. In-line JavaScript
```html
<button onclick="alert('Hello!')">Click me!</button> // Avoid
/*
Alert is technically the equivalant of print. It creates a pop-up and presents message. 
Annoying to users
*/
```
2. Internal JavaScript
```html
<script>
	// JavaScript
	console.log("JavaScript block");
	console.log(1+1);
</script>
```
3. External JavaScript
```html
<script src = "script.js"></script> //Script.js is a file with all the necessary javascript code
```
---