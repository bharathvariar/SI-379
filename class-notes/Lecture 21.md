---
Date: 2023-11-09
tags:
  - UMich
  - SI379
  - javascript
  - react
---
# `React.js` Loose Ends and Practice
## General JavaScript Pointers
### 1. Arrow Functions with Implicit Returns
- Arrow functions can be written with an implicit return.
- If the function body is a single expression, it will be returned.
- If the function body is a block (curly braces `{}`), must explicitly `return`.
```js
// Implicit return  
const add = (x, y) => x + y;  
// Explicit return  
const add = (x, y) => {  
return x + y;  
};
```
- By omitting the `{}` you don't need to write the `return` keyword and makes the code less verbose. JavaScript will *implicitly return* the value on that line. 
### 2. The `map` Function
- The `map` function is a method on arrays.
- Takes a function as an argument.
- Returns a new array with the result of calling the function on each element.
```js
const L = [1, 2, 3];
const addOne = (x) => x+1;
L.map(addOne); //[2, 3, 4]
```
```js
const names = ["Steve", "Bob", "Alice"];  
const namesWithExclamation = names.map(name => name + "!");  
console.log(namesWithExclamation); // ["Steve!", "Bob!", "Alice!"]
```  
```js
const numbers = [1, 2, 3];  
const numbersDoubled = numbers.map(number => number * 2);  
console.log(numbersDoubled); // [2, 4, 6]
```
## General React Pointers
### 1. Setting Elements' Classes
- In React, the `class` property is called `className`.
	- Reason: `class` is a reserved word in JavaScript (as in classes/instances)  
```js
function MyComponent() {  
	return <div className="my-class">Hello, world!</div>;  
}
```
### 2. Rendering Arrays
- You can render an array of elements.
	- React will render each element in the array.
	- React will also render nested arrays  
```js
function MyComponent() {  
	const names = ["Steve", "Bob", "Alice"];  
	return <div>  
		{names.map(name => <div>{name} is here today!</div>)}  
	</div>;  
}
```
### 3. The `key` Property
- Use the `key` property to give an element a **unique identifier**.
	- React uses this to keep track of elements when they change  
	- **Note**: React will warn you if you don't use key when you should  
```js
function MyComponent() {  
	const names = ["Steve", "Bob", "Alice"];  
	return <div>  
		{names.map(name => <div key={name}>{name} is here today!</div>)}  
	</div>;  
}
```
### 4. Accessing DOM Elements
```js
const x = <input type="text" />;
``` 
- Here, `x` is a **React element** (not a DOM element).
- It's a JavaScript object that represents the element that will be created/rendered at some point.
- But we might want to access the DOM element itself, use `React.useRef` to create a reference to a DOM element. For example, to get the value of the input: 
	-  Pass the reference to the `ref` property of an element  
```js
function MyComponent() {  
	const inputRef = React.useRef();  
	const handleClick = () => {  
		const inputElement = inputRef.current; // the actual DOM element  
		console.log(inputElement.value);  
		inputElement.value = ''; // clearing input for next element
	};  
	return <div>  
		<input type="text" ref={inputRef} />  
		<button onClick={handleClick}>Click me!</button>  
	</div>;  
}
```
---