---
Date: 2023-10-31
tags:
  - "#UMich"
  - "#SI379"
  - "#javascript"
  - "#react"
---
# Page Deployment and Design Patterns
## Deploying built pages (with `Parcel`)
- Recall: with `Parcel`, we can build our pages with (if index.html is our HTML file):  
```shell
npx parcel index.html  
```
- This creates a `dist` directory with the built page (plus some extra code for debugging) and runs a development server with a live preview at http://localhost:1234 (or similar).
- It is also a live-preview, i.e. all changes will be seen immedietely. 
- To build the page, we can run:  
```shell
npx parcel build index.html
```
- This creates a `dist` directory with the built page (without the extra code for debugging), but does not run a development server.  
- Note: to do this, we also need to remove this line from `package.json`. But this is specific to how we are using Parcel, not a general rule:  
```json
"main": "index.js",
```
- This creates two files, the minified `index.js`  (which will be named something like `index.238910.js`) and a `index.238910.js.map` file. The minified `index.js` will have one line of JavaScript code to increase efficiency and the `index.js.map` file helps in debugging (it maps different parts of the only line of code in the minified `index.js` to the line in the original `index.js` to help identify where any error occurs).
- Running `npx parcel build index.html` creates a `dist` directory with the  
following files:  
```shell
dist/  
	index.html  
	index.12345678.js  
```
- `index.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<script src="/index.50a4715f.js" type="module"></script>
</head>
<body> 
	<button>You have not clicked the button</button>  
</body>
</html>
```  
- `index.12345678.js`:  
```javascript
let t=0;const e=document.querySelector("button");e.addEventListener("click",()=>{var c;t++,e.innerText=1===(c=t)?`You clicked the button ${c} time`:`You
clicked the button ${c} times`});//#sourceMappingURL=index.50a4715f.js.map
```
- `index.html` points to `/index.50a4715f.js` :
```html
<!DOCTYPE html><html lang="en"><head><script src="/index.50a4715f.js" type="module">
```
- But our page deploys to a url like: "https://bharathvariar.github.io/si379-example/lectures/lecture-18/parcel_build_example/".  
- We're looking for https://bharathvariar.github.io/index.50a4715f.js  
- We want https://bharathvrir.github.io/si379-example/lectures/lecture-18/parcel_build_example/index.50a4715f.js.
- To fix this, we can use the `--public-url` flag in `Parcel` (to say "the public url for this page is ..."):  
```shell
npx parcel build --public-url /si379-example/lectures/lecture-18/parcel_build_example/ index.html
```  
## `.gitignore`
- One more problem: we're deploying too many files (this is not specific to Parcel). 
- When we run `npx parcel build ...` , we bundle all our dependencies into `index.12345678.js`.
- If we include a library like `D3` in our page, it will be bundled into `index.12345678.js`.  
- We usually want to avoid uploading "redundant" code to `git`.
- We don't want to upload the `D3` library inside of `index.12345678.js`and the `D3` library as a separate file (inside `node_modules`); we only need one copy of the `D3` library. So we typically avoid uploading `node_modules` to `git`.
- We can specify which files to deploy in a file called `.gitignore`. 
- `.gitignore` is a file that tells `git` which files to ignore (i.e., not upload to `git`).
- We can create a `.gitignore` file in the root of our project (next to `package.json`)
- Example `.gitignore` to say that we do not want to upload `node_modules`:  
```shell
node_modules/
```
- Note: if you work on multiple computers, this means you'll need to run `npm  install` on each computer to install the dependencies.
## Ideal Deployments
- Create one "source" branch in `Git` (usually `main` )  
	- Holds our code (`HTML`, `CSS`, `JavaScript`, etc.) 
	- Does not hold our built pages (e.g., `dist` )
	- Does not hold our dependencies (e.g., `node_modules`)  
- Create one "deploy" branch in `Git` (usually gh-pages )
	- Holds our built pages (e.g., `dist` )
	- Does not hold our code (`HTML`, `CSS`, `JavaScript`, etc.)  
- Does not hold our dependencies (e.g., `node_modules` )
- ...but working with two separate branches can be a pain so instead...
- Create one branch with both our code and our built pages ( main )  
	- Holds our code (`HTML`, `CSS`, `JavaScript`, etc.)  
	- Holds our built pages (e.g., `dist`)  
	- Does not hold our dependencies (e.g., `node_modules` )  
	- Specify this using `.gitignore`  
- This is technically not ideal but allows us to not worry about `Git` branches. 
# Design Patterns
- Design patterns are common solutions to common problems in software development. 
- They are general enough to apply in many situations. 
- Some help us write code that is:  
	- More *modular*, meaning that different parts of the code can be separated.  
	- Less *viscous*, meaning that it is easier to make changes to its functionality as needed.
	- Less *error-prone*. 
	- More *readable*.
## The Model-View-Controller (MVC) Pattern  
- One of the most popular design patterns in UI programming.
- Consider you are building a chess application. 
- The MVC pattern suggests that we separate the code into three parts:
	- *Model*: the data and logic of the application (think "back end").
		- Things like remembering the rules of chess, keeping track of the state of the board. 
	- *View*: the visual representation of the application (think "front end") .
		- How the pieces and the board looks.
	- *Controller*: the code that connects the model and the view.
		- The controller details how user interactions with the *view* modify the *model* (what happens to the board state when a piece is moved by the user).
![[Pasted image 20231106111739.png]]
- Here is an example of how MVC would apply to a "file browser" application:
![[Pasted image 20231106111823.png]]
### MVC In Practice  
- In practice, it difficult to separate view and controller.  
- Other splits have been proposed, including:  
	- [Model-View-Presenter (MVP) ](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) 
	- [Model-View-ViewModel (MVVM)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)
	- [Model-View-Adapter (MVA) ](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93adapter)
	- [Model-View-Intent (MVI)](https://fueled.com/blog/what-is-mvi-model-view-intent/)
- Many JavaScript frameworks call themselves "MVC frameworks" but most do  
not provide explicit support for "controller" components.  
- This is why some frameworks, like AngularJS are called *"MVW"* frameworks - *Model-View-Whatever.*  
- Among the popular "MV*" frameworks are:  
	- React
	- AngularJs  
	- Vue.js
## Libraries vs. Frameworks  
- A library is a collection of code that you can use in your project  
- Your code is "in charge" of calling the library's functions  
- A framework inverts this control; the framework calls your code  
- Framework is "in charge" of calling your code  
- Operate by the "Hollywood Principle": "Don't call us, we'll call you"
![[Pasted image 20231106111219.png]]
# Starting with `React`
### Boilerplate code "creator"
- To start run:  
```shell
npx create-react-app first-react-app
```
- and open first-react-app in VS Code.
- To start: Open the terminal in the `first-react-app` directory and run:  
```shell
npm start 
```
- (If it doesn't happen automatically) open http://localhost:3000/ in your browser.
- To stop the server, press `ctrl+c` in the terminal.
- This created a new React project in the `./first-react-app/` directory.
- Uses [Webpack](https://webpack.js.org/) as a bundler and configures it.
- Creates a sensible `.gitignore` file.
- Creates a sensible `package.json` file.
### Understanding the files created
- `public/index.html` - This is the HTML that will serve as the "root" of the page.  
	- Note that it is templated (you will see placeholders like `%PUBLIC_URL%` that will be filled in during the build process). 
- `public/manifest.json` - Some smartphones allow you to add apps to the home screen. This file specifies information about how your app should be presented ([more information here](https://developer.mozilla.org/en-US/docs/Web/Manifest)).
- `public/robots.txt` - Tells web crawlers (used by sites like Google to map the web) what they can and can't do on your site (of course not every crawler will necessarily listen). ([more information here](https://www.robotstxt.org/)).  
- `src/ndex.js` - Adds the React content to our DOM, using `ReactDOM.render()`. 
- `src/App.js` - Referenced by `index.js`, contains most of the body of the application right now.
## Writing code with React
- With the server running, try editing `src/App.js` to add (right after the `<header/>` element):  
```html
<h1>Hello, World!</h1>
```
- Save and look at the rendered page (which should happen automatically)  
- Also, note that [you're writing HTML tags directly in a JavaScript file](https://react.dev/learn/writing-markup-with-jsx)
- Note that `npm start` creates a live-deploy server, and all the changes will be visible immedietely.
- Note in `App.js` how we can just import a CSS file and even an image:  
```javascript
import './App.css';
```
- Try to see if you can do this with [Bootstrap](https://getbootstrap.com/):  
```shell
npm install bootstrap  
```
- Bootstrap is a `CSS` framework. 
- Then, find the correct CSS file to include and add an `import` to your code.  
- Replace the HTML in `App.js` with some basic Bootstrap code like 
```html
<section className="container">  
<h2>Button Group</h2>  
<div className="btn-group">  
<button type="button" className="btn btn-primary">Apple</button>  
<button type="button" className="btn btn-primary">Samsung</button>  
</div>  
</section>  
```
- Note that in the above example, we had to replace `class` with `className` .
## JSX
- [JSX](https://react.dev/learn/writing-markup-with-jsx) lets us put HTML directly in our JavaScript files.  
- This is [optional](https://react.dev/reference/react/createElement#creating-an-element-without-jsx) but convenient.
```javascript
const elem = <a href="https://www.si.umich.edu/">School of Information</a>; 
``` 
- The above line gets translated to [`React.createElement()`](https://react.dev/reference/react/createElement#creating-an-element-without-jsx) (this is similar to `document.createElement` but with a few additional features):  
```javascript
const elem = React.createElement('a', {href:'https://www.si.umich.edu/'}, 'School of Information');
```
### Rendering Components  
- The [`ReactDOM.createRoot()`](https://react.dev/reference/react-dom/client/createRoot) connects React elements with our DOM:  
```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));  
root.render(<h1>Hello!</h1>);  
```
### Custom Components  
- We can write custom components in React and use them as if they were  "standard" HTML elements (such as `<input />` , `<img />` , etc.).  
- In React, these are called ["components"](https://react.dev/learn/your-first-component)
- Two types of components:  
	- Function components (which we will use)  
	- Class components (we do not need)
### Function Components  
- Creating a function component:  
	- Define a function that accepts one argument: a list of properties (like HTML properties)  
	- The following code creates a Greeting component that expects a name property:  
```javascript
function Greeting(props) {  
	return <span>Hello, {props.name}</span>  
} 
``` 
- Now, we can reference this Greeting object with:  
```javascript
const elem = <Greeting name="Bharath"/>;  
```
---
