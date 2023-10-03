.const WORD_LENGTH = 5; // How long each guess should be
const inputEl = document.querySelector('#guess-inp'); // The input DOM element

// Will store the correct answer once fetched
let correctAnswer = '';

// Before we have a set answer, disable the input field and show a loading message
inputEl.setAttribute('disabled', true);
showInfoMessage('Loading...');

// Get a random answer from the list
getRandomAnswer((answer) => {
    correctAnswer = answer;              // Once we have it, store it, ...
    inputEl.removeAttribute('disabled'); // enable the input field, ...
    clearInfoMessage();                  // clear the loading message, and...
    inputEl.focus();                     // and focus the input field
    // NOTE : If you use Live Preview, the focus line ☝️ can get annoying because
    //       it will keep focusing the input field every time you edit the file.
    //       You can comment it out.
});

function displayGuessFeedback(guess) {
    const word = document.createElement('div');
    word.classList.add('guess');
    for (let i = 0; i < guess.length; i++) {
        const letterElement = document.createElement('span');
        letterElement.classList.add('letter');
        const letter = guess[i].toUpperCase();
        let correctLetter = correctAnswer[i];
        if (correctLetter) {
            correctLetter = correctLetter.toUpperCase();
            if (letter === correctLetter) {
                letterElement.classList.add('correct');
            } else if (correctAnswer.toUpperCase().includes(letter)) {
                letterElement.classList.add('present');
            } else {
                letterElement.classList.add('absent');
            }
            letterElement.textContent = letter;
            word.appendChild(letterElement);
        }
    }
    const guesses = document.querySelector('#guesses');
    guesses.appendChild(word);
}


inputEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const guess = inputEl.value.trim();
        if (guess.length !== WORD_LENGTH) {
            showInfoMessage(`Your guess must be ${WORD_LENGTH} letters long.`);
        } else {
            inputEl.value = '';
            isValidWord(guess, (isValid) => {
                if (isValid) {
                    displayGuessFeedback(guess);
                    if (guess.toUpperCase() === correctAnswer.toUpperCase()) {
                        showInfoMessage(`You win! The answer was "${correctAnswer}".`);
                        inputEl.setAttribute('disabled', true);
                    }
                } else {
                    showInfoMessage(`"${guess}" is not a valid word.`);
                }
            });
        }
    } else {
        clearInfoMessage();
    }
});
