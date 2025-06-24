// color list for both button sounds and button IDs
let colorList = ["GreenButton", "BlueButton", "RedButton", "YellowButton"];
let currentUserRun = [];
let currentPCRun = []
let level = 0
let gameRunning = true;

// Add event listeners to buttons
document.querySelectorAll(".btn").forEach(function (button) {
    // Add click event listener to each button
    button.addEventListener("click", function (event) {
        if (gameRunning === true) {
            // If the game is running, allow player to click buttons
            playerTurn(event);
        }
    });
});

document.querySelector("#start-button").addEventListener("click", function () {
    // Reset the game state
    checkGameState(currentUserRun.length - 1);
    gameRunning = true;
});

// a function to generate a random number for the computer's choice
// that does not allow for three of the same color in a row
function ranNumNoTriples() {
    let randomColor = Math.floor((Math.random() * 4));
    let pcChoice = colorList[randomColor];
    let lastIndex = currentPCRun.length - 1;
    // Check if the last two choices are the same and if so, change the choice
    if (currentPCRun[lastIndex] === pcChoice && currentPCRun[lastIndex - 1] === pcChoice) {
        pcChoice = colorList[(randomColor + 1) % 3];
    }
    return pcChoice;
}

function playerTurn(event) {
    // Play sound and add pressed class to button
    let sound = new Audio("./sounds/" + event.target.id + ".wav").play();
    document.getElementById(event.target.id).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(event.target.id).classList.remove("pressed");
    }, 100);
    // Add the player's choice to the current user run
    currentUserRun.push(event.target.id);
    // Check if the player's choice matches the current run
    checkGameState(currentUserRun.length - 1);
}

// Function to check the game state after each player choice
// If the current user run is empty, start the next item in the set
function checkGameState(playerChoice) {
    // If the player has not made a choice yet, do nothing
    if (currentPCRun.length === 0) {
        nextItemInSet();
    }
    // If the player has made a choice, check if it matches the current run
    else if (currentUserRun[playerChoice] === currentPCRun[playerChoice]) {
        if (currentUserRun.length === currentPCRun.length) {
            nextItemInSet();
        }
    } else { gameOver(); }
}

function gameOver() {
    // Play game over sound and reset the game
    let sound = new Audio("./sounds/wrong.wav").play();
    document.getElementById("level-title").innerHTML = "Game Over on Level: " + level;
    document.body.classList.add("game-over");
    currentUserRun = [];
    currentPCRun = []
    level = 0;
    gameRunning = false;
    setTimeout(function () {
        document.getElementById("level-title").innerHTML = "Press Start to Play";
        document.body.classList.remove("game-over");
    }, 100);
}

function nextItemInSet() {
    // Generate the next item in the set
    setTimeout(function () {
        let pcChoice = ranNumNoTriples();
        let sound = new Audio("./sounds/" + pcChoice + ".wav").play();                  // Play the sound for the computer's choice
        document.getElementById(pcChoice).classList.add("pressed");                     // Add pressed class to the button
        level++;                                                                        // Increment the level
        document.getElementById("level-title").innerHTML = "Current Level: " + level;   // Update the level title
        setTimeout(function () {
            document.getElementById(pcChoice).classList.remove("pressed");              // Remove pressed class from the button
        }, 100);
        // Add the computer's choice to the current run
        currentPCRun.push(pcChoice);
        // Reset the user's run for the next round
        currentUserRun = [];
    }, 1000);
}