---
Date: 2023-09-26
tags:
  - UMich
  - SI379
  - javascript
---
# Review, Reinforcement and Practice with Callbacks
## Synchronous vs. Asynchronous
- Consider unrelated tasks A and B (result of either task doesnt affect the other)
- If we carry them out *synchronously*, Start A first and only start B after A is completed.
- On the other hand, if we run them *asynchronously*, we can start both of them simultaneously, so we don't have to wait for A to finish just to start B.
- JavaScript code runs **synchronously**, but it expects us to use **callbacks** to run functions that may run for long times asynchronously.
- JavaScript runs on a single thread. 
- Synchronous style (DO NOT DO THIS - it will freeze the browser for 5 seconds)  
```JavaScript
btn.addEventListener("click", () => {  
	const timerContent = document.querySelector("#timer_content");  
	timerContent.textContent = "Timer started";  
	synchronousPause(5000); // This line takes five seconds to run  
	timerContent.textContent = "Five seconds have passed";  
});
```
- Note: `synchronousPause` is not a real function
- Asynchronous style (DO THIS INSTEAD)  
``` JavaScript
btn.addEventListener("click", () => {  
	const timerContent = document.querySelector("#timer_content");  
	timerContent.textContent = "Timer started";  
	setTimeout(() => {  
		// This line runs five seconds later  
		timerContent.textContent = "Five seconds have passed";  
	}, 5000); // This line runs immediately``` 
});
```
- From Problem Set 2:
	- Would be nice if we could do this synchronously...  
``` JavaScript
if(isValidWord(guess)) { /* do something */ }  
else { /* do something else */ }  
```
- Problem: `isValidWord` might take a long time (10 seconds? 1 minute?). We don't want to freeze the browser for that long  
- Solution: Use a callback function that gets called when we have a result  
	- If the word is valid, call the callback with `true`  
	- If the word is not valid, call the callback with `false`
```JavaScript
isValidWord(guess, (isValid) => {  //Running asynchronously
	if(isValid) { /* do something */ }  
	else { /* do something else */ }  
});
```
- Pass in a callback function that gets called when we know if the word is valid or not.  
- Called with `isValid` set to true if the word is valid
- Called with `isValid` set to false if the word is not valid
## When Do We Use Callback Functions?
- Event handlers (e.g. `addEventListener` )  
```JavaScript
el.addEventListener('click', () => {  
	console.log('Clicked!');
});
```
- Timeouts (e.g. `setTimeout` and `setInterval` )
```JavaScript
setTimeout(() => {  
	console.log('Two seconds have passed!');  
}, 2000);
```
- Asynchronous Callbacks (e.g. fetching a random word in problem set 2)
```JavaScript
isValidWord(guess, (isValid) => {  
	if(isValid) { /* do something */ }  
	else { /* do something else */ }  
});
``` 
- "Remove the animating class from el after 5 seconds"  
``` Javascript
setTimeout(el.classList.remove("animating"), 5000);  
```
- The above function won't work as intended and will remove the class immedietely cuz again, we are calling the function and not specifying the function object. 
- The first argument to `setTimeout` should be a callback function
```javascript
setTimeout(() => {
	el.classList.remove('animating');
}, 5000);
```
## Lecture Handout
- Suppose there's an API that allows you to fetch a list of friends and then fetch detailed information for every friend. When fetching a list of friends, we call `getListOfFriends` and provide a callback that will be called with a list of "friend IDs". Then, to get the details of every friend (e.g., name, location, etc.), we call `getFriend` and provide 
	1. the friend ID  
	2.  a callback that will be called with details about that friend.  
- The `getListOfFriends` function calls the callback with IDs in the format: ``["ID1", "ID2", ...]`` . The `getFriend` function accepts an `ID` (e.g, "ID1" ) and calls its callback with details in an object format: ``{name: "Steve", location: "Ann Arbor", description: "..."}`` .  
- Your task is to write code that will create a list of friend names using these two functions  and `document.createElement` . The final list should be appended to the body element and each friend's name should be displayed as a list item in an unordered list.
```javascript
getListOfFriends((friend_ids) => {
	for (const id of friend_ids) {
		getFriend(id, (friendInfo) => {
			const name = friendInfo.name;
			const elem = document.createElement('div');
			elem.innerText = name;
			document.querySelector('body').appendChild(elem);
		});
	}
});
```
## Practice Problems
- `setTimeout`: returns a "timer ID" that can be used to cancel the timeout  
- `clearTimeout`: takes a timer ID and cancels the timeout  
```javascript
const timerId = setTimeout(() => {  
console.log("Five seconds have passed!");  
}, 5000);  
// ...later...  
clearTimeout(timerId); // if this runs before 5 seconds, the callback won't run
```
- Given code that toggles a box between red and blue, write code that automatically toggles the box every second.  The box should be red for one second, then blue for one second, then red for one second, etc.  
- If the user clicks the box, it should toggle colors but reset the timer . 
```html
<!DOCTYPE html>
<html>
<head>
    <title>Box Example</title>
    <style>
        #box {
            width: 250px;
            height: 250px;
        }
        .red {
            background-color: red;
        }
        .blue {
            background-color: blue;
        }
    </style>
</head>
<body>
    <div id="box"></div>
    <script>
        let timerID = null;
        const box = document.querySelector("#box");
        const toggleColor = () => {
            if (box.classList.contains("red")) {
                box.classList.remove("red");
                box.classList.add("blue");
            } else {
                box.classList.remove("blue");
                box.classList.add("red");
            }
            if (timerID) {
                clearTimeout(timerID);
            }
            timerID = setTimeout(toggleColor, 1000);
        };
        box.addEventListener("click", toggleColor)
        toggleColor();
    </script>
</body>
</html>
```
---