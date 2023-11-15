import './App.css';
import React from 'react';

function ToDoList(props) {
	// Creating reference to input element
	const inputRef = React.useRef();
	const [toDoArr, setToDoArr] = React.useState(['Buy Milk', 'Buy Eggs']);
	const toDoElements = toDoArr.map((toDo, index) => <li key={index}>toDo</li>);
	// Creating a click handler 
	const handleClick = () => {
		const inputElement = inputRef.current; // the actual DOM element  
		console.log(inputElement.value);
		inputElement.value = ''; // clearing input for next element
	};

	return (
		<div>
			<ul></ul>
			<input type='text' ref={inputRef}/>
			<button onClick={handleClick}>Add</button>
		</div>
	);
}

export default ToDoList;
