// TODO: Write your code here
function addNewItem(content) {
    const listElement = document.createElement('li');
    listElement.innerText = content;
    listElement.classList.add('item');
    document.querySelector('#items').append(listElement);
    listElement.addEventListener('click', () => {
        listElement.classList.toggle('done'); // Change class to done when clicked
    })
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const textField = document.querySelector('#my-inp');
        const value = textField.value;
        addNewItem(value);
        textField.value = ''; // CLear text
    }
});