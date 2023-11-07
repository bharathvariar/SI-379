---
Date: 2023-11-02
tags:
  - UMich
  - SI379
  - javascript
  - react
---
# `React.js` Basics and State Management
## Custom Components
Components are just functions that return React elements.  
A React element is a JavaScript object that represents a DOM element (e.g `<div>` , `<p>` , etc.).
- It is not a DOM element itself (yet).
- React will take care of converting the React element into a DOM element and inserting it into the DOM at the appropriate time.
- How do we create a React element?  
```javascript
const reactElement = <div>Hello, world!</div>;
```  
- Webpack will convert this into a call to `React.createElement()` (which we will not use directly).
- Components are just functions that return React elements. For example:  
```javascript
function MyElement() {  
	return <h1>This is a custom element!</h1>;  
}
```
- We can *export* components from a file using `export default`.  
- `a.js`:  
	- `export` says that we want to be able to import this component from another file.
	- `default` says that this is the "main" thing we want to export from this file.
```js
const x = 5;  
export default x;
```  
- We can import components from another file using import  
- `b.js`:  
	- `import` says that we want to use a component from another file. 
	- `x` is the name we want to use for the component.
```js
import x from './a.js';  
console.log(x); // 5  
```  
- `./a.js` says which file we want to import from.
	- `./` says that we want to import from the current directory (`.`).
- **Note**: It is convention to name component files with a capital letter, for example `Greeting.js`.
- **Note**: 
## Variables in React Elements
- We can use variables in React elements using curly braces ( `{...}` )  
```javascript
const name = "Bob";  
const reactElement = <div>Hello, {name}!</div>;  
```
- The value of the variable will be converted to a string and inserted into the element.
- We can use any JavaScript expression inside the curly braces  
```javascript
const reactElement = <div>{2 + 2}</div>; 
``` 
- This will display `4`.
## Properties
- Components can take *properties* (also called *props*) as input.
- Properties are passed to the component as an object.
- Properties are **read-only** (cannot be changed by the component).
```js
function MyComponent(props) {  
	return <div>  
		<p>My name is {props.name}</p>  
		<p>I am {props.age} years old</p>  
	</div>;  
}
```  
- We can then use it:  
```js
<MyComponent name="Steve" age={40}>
```
## JavaScript Tricks 
### Object Destructuring  
- If `obj` is an object with properties `x` and `y` , we can write:  
```js
const {x, y} = obj;
```
- This is equivalent to:  
```js
const x = obj.x;  
const y = obj.y;
```
- We can use *object destructuring* to make it easier to access properties  
	- Instead of `props.name` , we can write `name`.
	- Instead of `props.age` , we can write `age`.
```js
function MyComponent(props) {  
	const {name, age} = props;  
	return <div>  
		<p>My name is {name}</p>  
		<p>I am {age} years old</p>  
	</div>;  
}
```
### Short-Circuit Evaluation  
- We can use *short-circuit evaluation* to make it easier to use default values.
	- Instead of `props.name || "World"` , we can write `props.name ?? "World"`.
	- Instead of `props.age || 0` , we can write `props.age ?? 0`.
---