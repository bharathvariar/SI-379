---
Date: 2023-09-12
tags:
  - UMich
  - SI379
  - html
  - EventListeners
---
# Practice with Event Listeners
## Recap
```javascript
setTimeout(<function_object>, <time_in_ms>);
event.addEventListner(<event_name>, <function_object>)
```
## Problems
Each of these pieces of code is supposed to change the ``<p>`` element after 5 seconds, but none of them work, so try and fix them:
```html
<p> Original Text </p>
<script>
	const p = document.querySelector('p');
	const onTimeout = () => {
		p.innerText ='New Text';
	};
	setTimeout(onTimeout(), 5000); //problem is onTimeout(), we need the object not the function
</script>
```
```html
<p> Original Text </p>
<script>
	let p = document.querySelector('p');
	const onTimeout = () => {
		p.innerText ='New Text';
	};
	setTimeout(onTimeout, 5000);
	p = null; // by reassigning p = null, by the time 5s is passed, p is null so innerText attribute is null
</script>
```
```html
<script>
	const p = document.querySelector('p'); // since the <p> element hasn't loaded yet, p is null and the function will not have any innerText
	const onTimeout = () => {
		p.innerText ='New Text';
	};
	setTimeout(onTimeout, 5000); 
</script>
<p> Original Text </p> 
```
```html
<p> Original Text </p>
<script>
	const p = document.querySelector('#p'); // # looks for element with id of p rather than paragraph elements, so p is null. 
	const onTimeout = () => {
		p.innerText ='New Text';
	};
	setTimeout(onTimeout(), 5000); 
</script>
```
## Manipulating DOM Elements
- `el.classList.add("x")` adds "x" to classList
- `el.classList.remove("x")` removes "x" from classList
- `el.classList.contains("x")` checks if `"x"` is in classList pf `el`
 ```html
 <!DOCTYPE html>
<html lang="en">
<!-- Write code to make a box that changes colour everytime it's clicked -->
<head>
    <meta charset="UTF-8">
    <title>My First Webpage</title>
    <style>
        #box {
            width: 250px;
            height: 250px;
            border-style: double;
        }
        .red-box {
            background-color: red;
        }
        .blue-box {
            background-color: blue;
        }
    </style>
</head>
<body>
    <div id="box" class="red-box"></div>
    <script>
        const box = document.querySelector("#box");
        function changeColour(event) {
            if (box.classList.contains('red-box')) {
                box.classList.remove('red-box');
                box.classList.add('blue-box');
            } else {
                box.classList.remove('blue-bo');
                box.classList.add('red-box');
            }
        }
        box.addEventListener('click', changeColour);
    </script>
</body>
</html>
```
---