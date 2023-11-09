---
Date: 2023-11-07
tags:
  - UMich
  - SI379
  - javascript
  - react
---
# `React.js` State management
## Adding Event Handlers to React.js Components  
- Adding event handlers looks different than in plain JavaScript.
- Previously, we used `element.addEventListener("click", handler)`.
- React uses `onClick={handler}` :  
```js
<button onClick={(ev) => console.log(ev)}>Click me</button>
```
- Example of a component with an event handler:  
```js
function MyComponent({name, age}) {// Note this is object destructuring
	const handleClick = (ev) => {  
		console.log(ev);  
	};  
	return <div>  
		<p>My name is {name}</p>  
		<p>I am {age} years old</p>  
		<button onClick={handleClick}>Click me</button>  
	</div>;  
}
```
## Tracking State in React.js
- *State*: The current status of a system.
### How to not track state in React.js
#### 1. Do not use local variables  
```js
function ClickTrackingButton() {  
	let clickCount = 0;  
	const buttonClicked = () => {  
		clickCount++;  
	};  
	return <button onClick={buttonClicked}>Clicked {clickCount} times</button>  
}
```  
- This will not work!  
- It always displays `Clicked 0 times`.  
- Every time the component is *re-rendered* (the function is called), `clickCount` will be reset to `0`.
#### 2. Do not use global variables  
```js
let clickCount = 0;  
function ClickTrackingButton() {  
	const buttonClicked = () => {  
		clickCount++;  
	};  
	return <button onClick={buttonClicked}>Clicked {clickCount} times</button>  
}
```  
- This (also) will not work!  
- It (also) always displays Clicked `0` times.
- React is a framework; it decides when to call `ClickTrackingButton`.  
	- It tries to call it as little as possible (only when something changes). 
	- We need to tell React when something changes.
### State Hooks
- React provides a way to track state using state hooks  
- Need to import `React`:  
```js
import React from 'react';
```  
- Then, we can use the `useState` hook:  
```js
React.useState(<<some initial value>>); 
``` 
- `React.useState` returns an array with two elements:  
	i. The current value of the state. (getter)
	ii. A function to update the state. (setter)
```js
const clickCountArr = React.useState(0);  
const clickCountVal = clickCountArr[0];  
const setClickCount = clickCountArr[1];
```
- The above code can be written in one line using array destructuring as:
```js
const [clickCountVal, setClickCount] = React.useState(0);
```
- To get the value of the state, use `clickCountVal`:  
```js
return <button onClick={buttonClicked}>Clicked {clickCountVal} times</button>
```  
- To update the value of the state, use `setClickCount`:  
```js
const buttonClicked = () => {  
	setClickCount(clickCountVal + 1);  
};
```
- So the final code will look like:
```js
function ClickTrackingButton() {  
	// Create a state variable named clickCountVal with initial value 0  
	const [clickCountVal, setClickCount] = React.useState(0);  
	// This function will be called when the button is clicked  
	const buttonClicked = () => {  
		// Call setClickCount to update the value of clickCountVal  
		setClickCount(clickCountVal + 1);  
	};
	
	return <button onClick={buttonClicked}>Clicked {clickCountVal} times</button>;  
}
```
### Example: `ColorPicker.js`
In the [color picker](https://soney.github.io/si379-assignments/ps6/color-guesser/) example's [`ColorPicker.js`](https://github.com/soney/si379-assignments/blob/main/ps6/color-picker/src/ColorPicker.js) we have state variables for the values of the three sliders:  
```js
const MIN = 0;
const MAX = 255;
const [red, setRed] = React.useState(getRandomIntegerBetween(MIN, MAX));  
const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));  
const [blue, setBlue] = React.useState(getRandomIntegerBetween(MIN, MAX));  
return (  
	<div className="App">  
		<div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />  
		<div id="color-picker">  
			<div className="row">  
				<span className="component-color-preview" style {{backgroundColor: `rgb(255, 0, 0, ${red/MAX})` }}>Red:</span>  
				<Slider min={MIN} max={MAX} startingValue={red} onChange={r => setRed(r)} /> 
			</div>  
			
			<div className="row">  
				<span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>  
				<Slider min={MIN} max={MAX} startingValue={green} onChange={g => setGreen(g)} />  
			</div> 
			 
			<div className="row">  
				<span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>  
				<Slider min={MIN} max={MAX} startingValue={blue} onChange={b => setBlue(b)} />  
			</div> 
		 
		</div>  
	</div>  
	);  
}
```
## Conditional Rendering  
- We can use conditional rendering to display different elements depending on the state:  
```js
function ClickTrackingButton() {  
	const [clickCountVal, setClickCount] = React.useState(0);  
	const buttonClicked = () => {  
		setClickCount(clickCountVal + 1);  
	}; 
	 
	if(clickCountVal === 7) {  
		return <button onClick={buttonClicked}>  
		Clicked {clickCountVal} times.  
		That's my lucky number!  
		</button>;  
	} else {  
		return <button onClick={buttonClicked}> 
		Clicked {clickCountVal} times  
		</button>;  
	}  
}
```
### Beyond true and false : "Truthy" and "Falsy"  
- We know that we can use `if` statements to conditionally execute code:  
```js
if(user.friendCount > 0) {  
	console.log("You have friends!");  
}
```  
- We usually use *boolean expressions* (e.g., `user.friendCount > 0` ) as the condition.
- It can be either `true` or `false`.
- ...but we can use any value as the condition. 
- Boolean expressions are just the most common  
- Every expression is either *truthy* or *falsy*,
- *Falsy* values:  
	- `false`  
	- `0`  
	- `""` (empty string)  
	- n`ull  
	- `undefined`  
	- `NaN`  
- *Truthy* values:  
	- Everything else  
	- `true`  
	- `1`  
	- `"false"` (the string)  
### The `&&` operator
- `a && b` is `true` if and only if `a` **and** `b` are both true.  
	- if `a` is `false` , then `a && b` is `false` no matter what `b` is.  
- JavaScript reads `a && b` from left to right.
	- if `a` is `false` , then `b` is never evaluated.
- In reality `a && b` is evaluated like this  
```js
if (a) { return b; }  
else { return a; }
```
- Examples:  
	- `true && "x"` → `"x"`  
	- `false && "x"` → `false`  
	- `"dog" && "cat"` → `"cat"`
### Using Short-Circuit Evaluation  
```js
let user_name;  
if(isLoggedIn()) {  
	user_name = getUsername();  
} else {  
	user_name = false;  
}
```  
can be expressed as:  
```js
const user_name = isLoggedIn() && getUsername();  
```
or adding more:  
```js
const user_name = isLoggedIn() && isOnline() && getUsername();
```
- React elements ignore falsy values!!  
- `{isLoggedIn() && "Hello user"}` will display `"Hello user"` if  
	- `isLoggedIn()` returns `true`.  
- And will display nothing if `isLoggedIn()` returns `false`  
```js
function ClickTrackingButton() {  
	const [clickCountVal, setClickCount] = React.useState(0);  
	const buttonClicked = () => {  
		setClickCount(clickCountVal + 1);  
	};  
	return <button onClick={buttonClicked}>  
		Clicked {clickCountVal} times.  
		{clickCountVal === 7 && "That's my lucky number!"}  
		</button>;  
}
```
- Another example:
```js
function Mailbox(props) {  
	return <div>  
	<h1>Hello</h1>  
		{unreadMessages.length > 0 &&  
			<h2>You have {unreadMessages.length} unread messages.<h2>  
		}  
	</div>  
}
```
- Yet another example:
- In the [dimension guesser's](https://soney.github.io/si379-assignments/ps6/dimension-guesser/) [`DimensionGuesser.js`](https://github.com/soney/si379-assignments/blob/main/ps6/dimension-guesser/src/DimensionGuesser.js#L49-L66), we only display certain items conditionally:  
```js
const showUserDimensions = cheatingMode || showingFeedback;  
	return (  
	<div className="App">  
		<label id="cheating-mode">Cheating mode <input type="checkbox" value={cheatingMode} onChange={onChangeCheatingMode} /></label>  
		<p>Guess the size of the grey rectangle below (in pixels)</p>  
		
		{!showingFeedback && <label>Width: <input type="number" min={MIN} max={MAX_WIDTH}  
		value={guessWidth} onChange={onChangeWidth} onKeyDown={onKeyDown} /></label> } &nbsp;  
		
		{!showingFeedback && <label>Height: <input type="number" min={MIN} max={MAX_HEIGHT}  
		value={guessHeight} onChange={onChangeHeight} onKeyDown={onKeyDown} /></label> }  
		
		{showingFeedback && <p>Your guess: {guessWidth} &times; {guessHeight}. Actual: <strong>{width} &times; {height}</strong></p> }  
		
		{!showingFeedback && <button onClick={doGuess}>Guess</button> }  
		
		{showingFeedback && <button onClick={doAdvance}>Next</button>}  
		
		<div id="guessing-rect" style={{width: `${width}px`, height: `${height}px`}} />  
		{showUserDimensions && <div id="answer-rect" style={{width: `${guessWidth}px`,  
		height: `${guessHeight}px`, position: "relative", top: `${-height-5}px`}} /> }  
	</div>  
);
```
### Short-Circuit Evaluation of the `||` operator
- In reality the `a||b` is evaluated like this:
```js
if (a) { return a; }  
else { return b; }
```
- Examples:  
	- `true || "x"` → `true`.  
	- `false || "x"` → `"x"`  
	- `"dog" || "cat"` → `"dog"`
## React.js: Callback Hooks
- React provides a way to create a function that is only created once.
- Need to import `React`:  
```js
import React from 'react';  
```
- Then, we can use the `useCallback` hook:  
```js
React.useCallback(<<function>>, <<array of dependencies>>); 
``` 
- `React.useCallback` returns a function that is **only created once**.
- The function will be re-created if any of the dependencies change
- Example:  
```js
function ClickTrackingButton() {  
	// Create a state variable named clickCountVal with initial value 0  
	const [clickCountVal, setClickCount] = React.useState(0);  
	// This function will be called when the button is clicked  
	const buttonClicked = React.useCallback(() => {  
	// Call setClickCount to update the value of clickCountVal  
		setClickCount(clickCountVal + 1);  
	}, [clickCountVal]);  
	return <button onClick={buttonClicked}>Clicked {clickCountVal} times</button>;  
}
```
- In the [dimension guesser's](https://soney.github.io/si379-assignments/ps6/dimension-guesser/) [`DimensionGuesser.js`](https://github.com/soney/si379-assignments/blob/main/ps6/dimension-guesser/src/DimensionGuesser.js#L49-L66),  we create several callbacks using `React.useCallback` :  
```js
const onChangeWidth = React.useCallback((e) => {  
	const value = parseInt(e.target.value);  
	setGuessWidth(value);  
}, []);  

const onChangeHeight = React.useCallback((e) => {  
	const value = parseInt(e.target.value);  
	setGuessHeight(value);  
}, []);  
```
## Under the Hood: React.js Components and Rendering  
- Recall that react is a **framework**.
	- It controls the flow of the program. 
	- It calls our code when it needs to.
- When we write `<MyComponent name="Steve" age={40} />`, React.js decides when  to call `MyComponent` and what to pass as `props`.
	- It also decides when to call `MyComponent` again (if ever).
	- Calling `MyComponent` is called *rendering*.
	- It decides when to update the DOM.
- `React.js` will re-render a component if:  
	- The component's props change. 
	- The component's state changes.
	- ...(and a few other reasons).
## JavaScript tricks
### Array Destructuring
- It's the same as object destructuring. 
```js
/* arr === [10, 20] */  
const [a, b] = arr;  
/* Equivalent to:  
const a = arr[0]; // a === 10  
const b = arr[1]; // b === 20  
*/
```
---