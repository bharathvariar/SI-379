---
Date: 2023-10-03
tags:
  - "#SI379"
  - "#javascript"
  - "#UMich"
---
# Animation
- Whenever possible we wanna use CSS animations
	- They are more efficient cuz they're rendered by a different part of the process
	- They're easier to write 
	- They're easier to maintain
- However, in this class we will write animation in JavaScript.
```html
<!DOCTYPE html>
<html>
	<head>
		<style>
			#block {
				position: absolute;
				border: 1px solid black;
				width: 150px;
				background-color: red;
			}
	</head>
	<body>
		<div id = 'block'></div>
		<script>
			/* Define a function that sets the x position of element */
			function setX(x) {  
				/*get the element*/
				const element = document.querySelector('#block'); 
				if(x) { 
				/*if x was specified, use it as the new left position*/
					element.style.setProperty('left', `${x}px`);  
				} else {  
					element.style.removeProperty('left');  
				}  		
			}  

			function runAnimation() {
				let x = 0;
				const to_x = 500; /*animation from x= 0 to x = 500*/
				function step() {
					setX(x); /*move block to x*/
					x++;
					if (x < to_x) { /*stop moving when block is at dest*/
						/*Slowly move x (1px/10ms)*/
						setTimeout(step, 10); 
					}
				} 
				step();
			}
		</script>
	</body>
</html>
```
## Parameterising Animations: FPS
```javascript
function runAnimation(fps) {
	let x = 0;
	const to_x = 500; /*animation from x= 0 to x = 500*/
	function step() {
		setX(x); /*move block to x*/
		x++;
		if (x < to_x) { /*stop moving when block is at dest*/
			setTimeout(step, 1000/fps); /*Slowly move x (fps/1s)*/
		}
	} 
	step();
}
```
- However the problem with this code is that the block moves slower, since we have coupled `fps` with animation duration. The block should move at the same speed regardless of `fps`, and only the calls on `step()` should be affected by `fps`
### Timestamps
- Timestamps is the amount of seconds (or milliseconds) since Midnight, January 1st 1970. 
- Javascript uses milliseconds.
- We can get current timestamp with the function `Date.now()` that returns the number of milliseconds since January 1, 1970.
- We use time as the second argument to `runAnimation()`.
```javascript
function runAnimation(fps, duration) {
	const to_x = 500; /*animation from x= 0 to x = 500*/
	const animationStarted = Date.now(); /*Timestamp when animation started*/
	
	function step() {
		const now = Date.now() /*Current timestamp*/
		/*percentage is the % of animation complete. Range -> [0,1]*/
		const percentage = (now - animationStarted)/duraton;
		const x = percentage * to_x;
		setX(x); /*move block to x*/
		
		if (percentage < 1) { /*stop moving when block is at dest*/
			setTimeout(step, 1000/fps); /*Slowly move x (fps/1s)*/
		}
	} 
	step();
}
```
## Custom Animation Speed
- Sometimes, we don't know the best fps to use, it depends on the user, their preferences and their system capabilities and settings.
- Now we can hand-off the responsibility of deciding `fps` to the browser using the function [`window.requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
```javascript
function runAnimation(duration) {
	const to_x = 500; /*animation from x= 0 to x = 500*/
	/*Timestamp when animation started*/
	const animationStarted = Date.now(); 
	
	function step() {
		const now = Date.now() /*Current timestamp*/
		/*percentage is the % of animation complete. Range -> [0,1]*/
		const percentage = (now - animationStarted)/duraton;
		const x = percentage * to_x;
		setX(x); /*move block to x*/
		
		if (percentage < 1) { /*stop moving when block is at dest*/
			/*Run step() when the browser is ready to do another frame*/
			requestAnimationFrame(step); 
		}
	} 
	step();
}
```
- Even though the documentation refers to the function as `window.requestAnimationFrame()`, we really do not need to write `window` every time because, `window` is a variable that encompasses everything. For example, we can write `document.querySelector()` as `window.document.querySelector()` instead but we choose not to. 
- Now instead of hard-coding `to_x` and start positon (`x = 0`), we will take them as arguments to the function.
```javascript
function runAnimation(duration, fromX, toX) {
	/*Timestamp when animation started*/
	const animationStarted = Date.now(); 
	
	function step() {
		const now = Date.now() /*Current timestamp*/
		/*percentage is the % of animation complete. Range -> [0,1]*/
		const percentage = (now - animationStarted)/duraton;
		/* pct = 0: x = fromX
		pct = 1: x = toX */
		const x = (percentage * (toX- fromX)) + fromX;
		setX(x); /*move block to x*/
		
		if (percentage < 1) { /*stop moving when block is at dest*/
			/*Run step() when the browser is ready to do another frame*/
			requestAnimationFrame(step); 
		}
	} 
	step();
}
```
## Non-Linear Animation
- Linear animations aren't realistic, they do not include *inertia*.
- Our current code is linear, as in, at any given time the position of the box, given by `const x = (percentage * (toX- fromX)) + fromX;` will be on the straight line drawn between `fromX` and `toX`
- We instead use and *ease-in ease-out* formula. 
- The easedInOut movement takes into account inertia and the block takes time to pick-up speed and slow down. However, it still starts and stops at `toX` and `fromX` at the same time. 
```javascript
function runAnimation(duration, fromX, toX) {
	/*Timestamp when animation started*/
	const animationStarted = Date.now(); 
	
	function step() {
		const now = Date.now() /*Current timestamp*/
		/*percentage is the % of animation complete. Range -> [0,1]*/
		
		/*Linear movement*/
		const percentage = (now - animationStarted)/duraton;
		/*Ease-in-out. Credit: https://gist.github.com/gre/1650294*/
		const easedPercentage = pct<.5 ? 2*pct*pct : -1+(4-2*pct)*pct;
		
		/* pct = 0: x = fromX
		pct = 1: x = toX */
		const x = (easedPercentage * (toX - fromX)) + fromX;
		setX(x); /*move block to x*/
		
		if (percentage < 1) { /*stop moving when block is at dest*/
			/*Run step() when the browser is ready to do another frame*/
			requestAnimationFrame(step); 
		}
	} 
	step();
}
```
- [More Easing functions](https://easings.net/)
---