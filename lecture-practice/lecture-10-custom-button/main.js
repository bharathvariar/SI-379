const btn = document.querySelector('.custom-button'); // btn is our "fake" button
let active = false;

btn.addEventListener('mouseover', () => {
// Add a class of "hover" to the button when the mouse is over it
    btn.classList.add('hover');
    if (active) {
        // If the user's mouse comes back over the button while the mouse is **still** pressed down, add the "active" class
        btn.classList.add('active');
    }
});

btn.addEventListener('mouseout', () => {
    btn.classList.remove('hover');
    if (active) {
        // If the user's mouse leaves the button while the mouse is pressed down, remove the "active" class
        btn.classList.remove('active');
    }
});

btn.addEventListener('mousedown', () => {
    // Add a class of "active" to the button when the user presses the mouse down on it
    btn.classList.add('active');
    active = true;
});

window.addEventListener('mouseup', (event) => {
    // If the user's mouse is released while it is over the button, "flash" the button by calling flashClicked(btn)
    if (event.target === btn) { //event.target is where the event happened.
        flashClicked(btn);
    }
    btn.classList.remove('active');
    active = false;
})

/**
 * Call this function when you want to "flash" the button --- when it is clicked
 * 
 * @param {*} element The element that we want to "flash"
 */
function flashClicked(element) {
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 300);
}

// Give the "real" button a flash effect
const realButton = document.querySelector('button');
realButton.addEventListener('click', () => {
    flashClicked(realButton);
});