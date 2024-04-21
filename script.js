let attempts = 6;
let dictionary = ['REYNA', 'GEKKO', 'CLOVE', 'VIPER','ASTRA'];
let word = getRandomWord();

let guessedWords = []; 

window.addEventListener('load', init);

function init() {
    const button = document.getElementById("guess-button");
    button.addEventListener("click", guess);

    const input = document.getElementById("guess-input");
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            guess();
        }
    });

    updateAttempts();
}

function getRandomWord() {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
}

function guess() {
    const guess = getGuess();
    if (!guess) {
        return;
    }

    if (guessedWords.includes(guess)) {
        showMessage("Palabra ya utilizada.");
        return;
    }

    guessedWords.push(guess);
    showMessage("");

    if (guess === word) {
        endGame(`<h2>¡GANASTE!😀</h2><p>La palabra correcta es: ${word}</p>`);
        return;
    }

    const grid = document.getElementById("grid");
    const row = document.createElement('div');
    row.className = 'row';

    for (let i = 0; i < word.length; i++) {
        const span = document.createElement('span');
        span.className = 'letter';
        if (guess[i] === word[i]) {
            span.innerHTML = guess[i];
            span.style.backgroundColor = '#79b851'; // Verde
        } else if (word.includes(guess[i])) {
            span.innerHTML = guess[i];
            span.style.backgroundColor = '#f3c237'; // Amarillo
        } else {
            span.innerHTML = guess[i];
            span.style.backgroundColor = '#a4aec4'; // Gris
        }
        row.appendChild(span);
    }

    grid.appendChild(row);
    attempts--;
    updateAttempts();

    if (attempts == 0) {
        endGame(`<h2>¡PERDISTE!😖</h2><p>La palabra correcta era: ${word}</p>`);
    }
}

function getGuess() {
    let guess = document.getElementById("guess-input").value.toUpperCase();
    if (guess.length !== 5) {
        alert("Por favor, ingresa una palabra de 5 letras.");
        return "";
    }
    return guess;
}

function updateAttempts() {
    document.getElementById("attempts").innerText = `Intentos Restantes: ${attempts}`;
}

function endGame(message) {
    const input = document.getElementById("guess-input");
    const button = document.getElementById("guess-button");
    input.disabled = true;
    button.disabled = true;
    let container = document.getElementById('guesses');
    container.innerHTML = message;
}

function showMessage(message) {
    document.getElementById("message").innerText = message;
}
