

let harry_potter_char = [
    "HARRY POTTER",
    "HERMOINE GRANGER",
    "RON WEASLEY",
    "GINNY WEASLEY",
    "ALBUS DUMBLEDORE",
    "VOLDEMORT",
    "FLUFFY",
    "BUCKBEAK",
    "MINERVA MCGONAGALL",
    "RUBEUS HAGRID",
    "DOBBY",
    "MOANY MYRTLE",
    "FANG",
    "GRIPHOOK",
    "KREACHER",
    "ARAGOG",
    "DRACO MALFOY",
    "SEVERUS SNAPE",
    "SIRIUS BLACK",
    "REMUS LUPIN",
    "DUDLEY DURSLEY",
    "LUNA LOVEGOOD",
    "NEVILLE LONGBOTTOM",
    "CEDRIC DIGGORY",
    "BELLATRIX LESTRANGE"
]

let solution = '';
let maxIncorrect = 6;
let numberIncorrect = 0;
let playerGuessed = [];
let wordState = null;
const livesPic = '<img src="./images/hpface.gif" alt="Harry Potter face" id="hplife">';
const lives_container = document.getElementById('hpLivesFaces');
let selectSound = new Audio('./sounds/select.mp3');
let twinkleSound = new Audio('./sounds/twinkle.mp3');
// Sound Effect by <a href="https://pixabay.com/users/shidenbeatsmusic-25676252/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=115095">ShidenBeatsMusic</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=115095">Pixabay</a>
let winSound = new Audio('./sounds/win.mp3');
let loseSound = new Audio('./sounds/lose.mp3');


function pickRandomWord() {
    solution = harry_potter_char[Math.floor(Math.random() * harry_potter_char.length)]
}

// Function to create buttons for each letter that player can choose from. String of alphabet. Split the array. Then map each letter to make a function for each individual letter to create a button for each one. When a button is clicked, it will run function rightOrWrong().
function createLetterButtons() {
    let buttonsGame = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ".split('')
    .map(
        (letter) =>
            `<button 
            class="btn btn-lg btn-danger m-2 letterBtns"
            id='${letter}'
            onClick="rightOrWrong('${letter}'), selectSound.play()"
            >
            ${letter}
            </button>`
        ).join('');

    // Displays the buttons on screen.
    document.getElementById('letterButtons').innerHTML = buttonsGame;
}

// Run these functions after player chooses a letter. Handles the player's choice if correct or incorrect.
function rightOrWrong(playerLetter) {
    // If indexOf is >= 0, then letter chosen is part of the answer, if -1 then the letter chosen is not part of the answer. 
    
    // If wrong letter chosen, letter button becomes disabled.
    playerGuessed.indexOf(playerLetter) === -1 ? playerGuessed.push(playerLetter) : null;
    document.getElementById(playerLetter).setAttribute('disabled', true);

    if (solution.indexOf(playerLetter) >= 0) {
        guessThisWord();
        didPlayerWin()
    } else if (solution.indexOf(playerLetter) === -1) {
        numberIncorrect++;
        updateNumberIncorrect();
        didPlayerLose();
        nextGamePic();
        draw_lives();
    }
}

// Shows underscores in place of letters to be guessed, if not already guessed, using split() and map() methods. 
function guessThisWord() {
    wordState = solution.split('').map(letter => (playerGuessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.getElementById('wordGoesHere').innerHTML = wordState;
}

// Sets maximum number of incorrect guesses to 6 in upper right corner.
document.getElementById('maxIncorrect').innerHTML = maxIncorrect;


//Updates the number of incorrect guesses in upper right corner.
function updateNumberIncorrect() {
    document.getElementById('numberIncorrect').innerHTML = numberIncorrect;

}

// When player loses, shows the solution where letter lines are, and YOU LOSE string where letter buttons are.
function didPlayerLose() {
    if (numberIncorrect === maxIncorrect) {
        document.getElementById('wordGoesHere').innerHTML = 'The answer is: ' + solution;
        document.getElementById('letterButtons').innerHTML = 'YOU LOSE!!';
        loseSound.play();
       
    }
}

// When player wins, shows YOU WIN string where letter buttons are. 
function didPlayerWin() {
    if (wordState === solution) {
        document.getElementById('letterButtons').innerHTML = 'YOU WIN!! GREAT JOB!'
        document.getElementById('gamePic').src = './images/' + solution + '.JPG';
        winSound.play()
    }
}

// When player guesses incorrectly, image updates with next part of body.
function nextGamePic() {
    document.getElementById('gamePic').src = './images/' + numberIncorrect + '.JPG';
}

// Handles the lives, draws all lives and then removes them as player guesses incorrect letters. 
function draw_lives() {
    
    lives_container.innerHTML = "";
    let maxMinusFails = maxIncorrect - numberIncorrect;
    for (let j = 0; j < maxMinusFails; j++) {
        const img = document.createElement("img");
        img.setAttribute("src", "./images/hpface.gif");
        img.setAttribute("id", "hplife");
        const new_life = img;
        lives_container.appendChild(new_life);
    }
    console.log(maxMinusFails);
}

// To reset to a new game when player clicks on New Game button.
function reset() {
    numberIncorrect = 0;
    playerGuessed = [];
    document.getElementById('gamePic').src='./images/0.JPG';
    pickRandomWord();
    guessThisWord();
    updateNumberIncorrect();
    createLetterButtons();
    draw_lives();
}

// Run these functions
pickRandomWord();
createLetterButtons();
guessThisWord();
draw_lives();
