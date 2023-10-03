---
Date: 2023-09-19
tags:
  - UMich
  - SI379
  - javascript
---
# Callback Arguments and Creating DOM Elements
## Manipulating DOM Elements' Attributes
```javascript
element.getAttribute("id"); // Gets id of element
element.setAttribute("x", "y") // Sets attribute x to y 
element.removeAttribute("x") // Removes attribute x
```
## Manipulating DOM Tree
- `document.createElement('p')` creates new `<p>` element
- `parent.append(child)` appends `child` to `parent` (as last child)
	- Similar: `.prepend`-> insert at beginning
	- Similar: `.insertBefore(child, sibling)` -> inserts child before sibling
- `inp.vale = "x"` sets value of `inp` to `x`
	- useful for `<input>`  elements
- `element.scrollTop = "x"` sets scroll position of `element` to `x`
- `element.focus()` and `element.blur()` to focus (select) and blur (deselect) element.
- `el.dataset.x = "y";` can store data in `el` (through attribute data-x )  
	- Avoid this unless necessary  
	- Try storing and retrieving data in JavaScript instead  
- `el.style.x = "y";` sets the value of style `x` to `y`  
	- Avoid this unless necessary  
	- Usually best done with CSS
## JavaScript Function Arguments
- Number of argument doesn't have to match the number of parameters it's defined with
```javascript
function add(x, y) { // x and y are parameters  
	return x + y;  
} 
```
```javascript
const a = add(1, 2); // 3  
const b = add(1); // NaN; y is undefined  
const c = add(); // NaN; x and y are undefined  
const d = add(4, 5, 6, 7); // 9  
console.log("This is reached"); // NO RUNTIME ERROR  
console.log(a, b, c, d); // 3, NaN, NaN, 9
```
## Callback to Callback Functions
- Adding event listener for `keydown` event.
```javascript
const inp = document.querySelector('#my-input');  
inp.addEventListener('keydown', (event) => {  
		console.log(event.key); // *which* key was pressed  
});
```
- Listening for enter key being pressed.
```javascript
const inp = document.querySelector('#my-input');
inp.addEventListener('keydown', (event) => {
	if (evemt.key === 'Enter') {
		console.log("User pressed enter!");
		const value = inp.value; //Text that the user typed in;
		console.log(value);
		inp.value = '' // Clears input valuex
	}
})
```
---