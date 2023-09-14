---
Date: 2023-09-07
tags:
  - UMich
  - SI379
  - javascript
  - html
---
# Adding Event Listeners
## JavaScript Load Order
```html
<html>
	<head>
		<script>
			const p = document.querySelector('p');
			p.innerHTML = 'Updated Paragraph element';
			// <p> element hasn't been loaded so 
			// const p refers to null object
		</script>
	</head>
	<body>
		<p> 'Old Paragraph Element' </p>
	</body>
</html>
```
- In the above code we expect the old paragraph element to show briefly and then change immedietely.
- But what actually happens is that we see the old paragraph element never change and error  ```p.innerHTML is null```
- This happens cuz code runs from top to bottom and when the script element runs, there is no p element. This means ```querySelector('p')``` returns ```null```.
- We can fix this by:
	- Putting ```<script> ... </script>``` element at the end instead of in the ```<head>``` by doing this all elements have already been loaded (cuz of T-D running) and we avoid this lecture.
## Functions in JavaScript
- Multiple ways to define functions.
```Javascript
function add(a, b) { // Function declaration
	return a + b; // ("traditional")
}
const add = function(a, b) { // Anonymous function expression
	return a + b;
}
const add = (a, b) => { // Arrow function with block body
	return a + b;
}
const add = ( a, b ) => a + b; // Arrow function with concise body
```
- Functions are *first-class objects* in JavaScript (like #python)
	- **Functions can be passed as arguments to other functions.** 
	- Functions can be returned from other functions.
### Callback Functions
- When one function is passed into another as an argument. 
- The function that was passed will be *"called back"* later.
```javascript
const callback = () => {
	console.log("Callback called");
};
setTimeout(callback, 1000); // Call function callback after given time(in ms)
```
- JavaScript will use a *registered Event Listener* (which are embedded in the browser) and use that to measure time.  
- When the said time is over, the browser adds the given element (function: callback) to a queue to necessary actions to take. 
- Once the function reaches front of queue, it is executed by browser.
- Note: in python, ```sleep(5000)``` would mean that the line of execution doesn't move ahead of the line for 5 seconds. On the other hand when JavaScript sees ```setTimeout(callback, 5000)``` it *"notes"* it down and continues execution. 
```html
<html>
	<head>
	</head>
	<body>
		<p> 'Old Paragraph Element' </p>
		<script>
			const callback = () => {	
				const p = document.querySelector('p');
				p.innerHTML = 'Updated Paragraph element';
			}
			setTimeout(callback, 5000);
		</script>
	</body>
</html>
```
- Works as intended, but now what will happen when the script is moved back to the head element?
```html
<html>
	<head>
		<script>
			const callback = () => {	
				const p = document.querySelector('p');
				p.innerHTML = 'Updated Paragraph element';
			}
			setTimeout(callback, 5000);
		</script>
	</head>
	<body>
		<p> 'Old Paragraph Element' </p>
	</body>
</html>
```
- It will work as intended (text change after 5s). But what's important is to know that the function ```callback``` is "made" but is called only after the rest of the page is rendered (5 seconds is more than enough time to render full page) and so now ```p.innerHTML``` is no longer ```null```. 
- Although this works, it isn't recommended since there is no guarantee that the element needs to be modified will be loaded in the given time interval.
## Event Listeners
```html
<html>
	<head>
	</head>
	<body>
		<button id="my-button">Button</button>
	</body>
	<script>
		const button = document.querySelector('#my-button');
		const callback = (event) => {
			console.log('Button clicked');
		};
		button.addEventListener('click', callback);
	</script>
</html>
```
- You can also leave the ``callback`` function anonymous.
```html
<html>
	<head>
	</head>
	<body>
		<button id="my-button">Button</button>
	</body>
	<script>
		const button = document.querySelector('#my-button');
		button.addEventListener('click', (event) => {
			console.log('Button clicked');
		});
	</script>
</html>
```

```html
<html>
	<head>
	</head>
	<body>
	</body>
	<script>
		const onTimeout = () => {
			console.log("Timeout");
		};
		setTimeout(onTimeout(), 2000);
	</script>
</html>
```
- This function will timeout immedietely (at 0 ms) cuz the function is called instead of the function object. (``onTimeout()`` is calling the function while ``onTimeout`` references the object).
---
