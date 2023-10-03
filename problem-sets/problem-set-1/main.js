let score = 0;

for (const id of getAllHoleIds()) {
    let tile = document.getElementById(id);
    tile.addEventListener('click', () => {
        if (tile.classList.contains('needs-whack')) {
            tile.classList.remove('needs-whack');
            tile.classList.add('animating-whack');
            setTimeout(() => { tile.classList.remove('animating-whack') }, 500);
            score++;
            document.querySelector('#score').textContent = `Score: ${score}`; // Update the score display
            if (score >= 45) {
                clearInterval(interval); // Stop the game
            }
        }
    });
}

const interval = setInterval(() => {
    if(getRandomUnwhackedHoleId) {
        tile = document.getElementById(getRandomUnwhackedHoleId());
        tile.classList.add('needs-whack');
    }
}, 1000);

/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" 

    if (inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole');
    const ids = [];
    for (const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}