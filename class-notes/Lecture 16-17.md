---
Date: 2023-10-24
tags:
  - "#UMich"
  - "#SI379"
  - "#javascript"
---
# Integrating Libraries
- Recall: Variables declared in one file are visible in other files  
```html
<head>  
<script src="a.js"></script>  
<script src="b.js"></script>  
</head>
```
```javascript
// a.js:  
const x = 5;
// b.js:  
console.log(x); // 5
```
- Note: order of `<script>` tags matters! We had to declare `x` (`a.js`) before using it (`b.js`)
- In some problem sets, we provide a `utilities.js` file (or similar):  
```html
<script src="utilities.js"></script>  
<script src="main.js"></script>  
```
```javascript
// utilities.js:
function reallyHelpfulFunction() {  
// ...  
}  
// main.js:  
const importantValue = reallyHelpfulFunction();
```
- But what if other people have written useful functions that we want to use?  
	- They package them up into libraries (or modules).
- Example: `Lodash` has many useful functions for working with arrays, objects, etc.  
- Creates a global variable `_` that contains all of the functions (yes, `_` is a valid  
variable name in JavaScript).
- Example: We can use `_.shuffle` to shuffle an array. 
```javascript
const shuffled = _.shuffle([1, 2, 3, 4, 5]);  
// Example: _.sample to get a random element from an array  
const randomElement = _.sample([1, 2, 3, 4, 5]);
```
## Importing Libraries
There are 4 ways to import libraries:  
1. "Classical" ways:  
	i. Download the library and include it in your HTML file (e.g. `<script src="lodash.js"></script>`).
	ii. Use a *CDN (Content Delivery Network)* and put a `<script>` tag in your HTML file.
2. "Modern" ways:  
	iii. Use a *package manager* (e.g., `npm`) and a *bundler* (e.g., `webpack`) .
	iv. Use `import` statements in your JavaScript file(s).
### Semantic Versioning
- Libraries use *semantic versioning*  
- Version numbers are of the form `MAJOR.MINOR.PATCH`  
	- `MAJOR` version number is incremented when there are breaking changes.  
	- `MINOR` version number is incremented when there are new features.
	- `PATCH` version number is incremented when there are bug fixes. 
- Updating to a `MAJOR` version number may break your code.
- Updating to a `MINOR` version should not break your code (but might add new  functionality).
- Updating to a `PATCH` version should not break your code (but might fix bugs).
- *"Carat"* operator ( `^` ) in `package.json: ^4.17.21` means "`4.*.* `" - any version of `lodash 4`  
- *"Tilde"* operator ( `~` ) in `package.json : ~4.17.21` means "`4.17.*`" - any version of `lodash 4.17`
- Jackie has a project that uses `lodash 4.17.21`. `Lodash 4.17.22` was just released. Should she update?  
	- Yes, it's a patch version (bug fixes).
- Jackie has a project that uses `lodash 4.17.21`. `Lodash 4.18.0` was just released. Should she update?  
	- Probably, it's a minor version (new features), but double-check the release notes.
- Jackie has a project that uses `lodash 4.17.21`. `Lodash 5.0.0` was just released. Should she update?  
	- Maybe; it's a major version (breaking changes), so it might break her code. She needs to carefully read the release notes and test her code.
### Method 1: Downloading
```html
<script src="lodash.js"></script>  
<script src="main.js"></script>  
```
```javascript
const shuffled = _.shuffle([1, 2, 3, 4, 5]);  
```
- Convention:  
	- `lodash.js` is the *"unminified"* version of the library (easier to read, but larger file).
	- `lodash.min.js` is the *"minified"* version (harder to read, but smaller file size).
#### Pros and Cons of Downloading the Library
- **Pros**:  
	- Easy to get started.
	- No build process.
	- Works in all browsers.
- **Cons**:  
	- Need to download the library.
	- Need to keep the library up-to-date.
	- Need to include the library in every HTML file that uses it.
	- Hard to manage dependencies (e.g., if you use multiple libraries).
	- Can be slow to load (especially if the library is large).
### Method 2: Using a CDN
- *CDN* = Content Delivery Network  
- A CDN is a server that hosts a library for you  
- You can include the library in your HTML file using a `<script>` tag  
- Example: [cdnjs.com](https://cdnjs.com/libraries/lodash.js) and [jsdelivr](https://www.jsdelivr.com/package/npm/lodash)
```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>  
<script src="main.js"></script>
```
#### Pros and Cons of Using a CDN
- **Pros**:  
	- No need to download the library.
	- (Maybe) easier to keep the library up-to-date.
	- (Maybe) easier to manage dependencies.
	- (Maybe) faster to load (CDNs often use a "Content Delivery Network" to serve the library from a server close to you)  
- **Cons**:  
	- CDNs can go down (e.g., if the server is down).
	- CDNs can be blocked (e.g., if you are behind a firewall).
	- CDNs can be hacked (e.g., if someone hacks the server).
	- Need to be online when working on your project
### Problems with Downloading and CDNs
- Name collisions: What if two libraries use the same variable name?
- Complexity: What if you want to use a library that depends on another library that depends on another library that depends on another library?
- Dependency management: What if two libraries depend on different versions of the same library?  
- How do we manage all of these dependencies in a project that uses a lot of libraries?
### Method 3: Use a Package Manager and a Bundler
- Package manager: tool for installing and managing libraries  
	- [npm](https://www.npmjs.com/) is the most popular package manager for JavaScript  
	- [yarn](https://yarnpkg.com/) is another popular package manager for JavaScript.
- Bundler: tool for combining multiple JavaScript files into a single file  
	- [webpack](https://webpack.js.org/) is the most popular bundler for JavaScript  
	- [parcel](https://parceljs.org/) is another popular bundler for JavaScript
#### Installing `npm` and `parcel`
- Getting started using `npm`:
	1. Download `npm` from website.
	2. In a terminal (in your project directory):  
```shell
npm init
```
- Create a `package.json` file that describes your project and the libraries it uses
- Installing a library using `npm`:  
```shell
npm install lodash
```  
- Creates a `node_modules` directory and downloads the library into it.
- Installing `parcel`:
```shell
npm install parcel
```
- In `index.html` , add `type="module"` to the `<script>` tag:  
```html
<script src="main.js" type="module"></script>  
```
- This tells the browser that main.js is a *"module"* - a more modern way of writing JavaScript that can use import statements (since JavaScript wasn't initially designed to manage libraries).
- `import` statements allow us to import libraries (but only in "modules")  
```javascript
//main.js:  
import _ from 'lodash';
```
- Advantages of `import` statements with a package manager and bundler:  
	- No name collisions (libraries are imported into their own scope).
	- No need to include the library in every `HTML` file that uses it.
	- No need to download the library (`npm` does it for us).
	- Easier to keep the library up-to-date (`npm` does it for us).
	- Can import specific functions from a library.
- Next, we need to tell parcel to bundle our code:  
```shell
npx parcel index.html
```  
- This will create a `dist` directory with a `main.js` file that contains all of our code and the code from the libraries we imported. Can upload the built code to a server.
- Building for production:  
Edit `package.json` to add:  
```json
{  
"source": "index.html"  
//...  
}
```  
Then run:  
```shell
npx parcel build
```





---