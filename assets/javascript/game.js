var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var wordBank = ["agnetha", "frida", "benny", "bjorn", "disco", "waterloo", "glitter", "fringe", "sweden", "queen", "seventies", "eighties", "ineffable", "fernando", "cher", "honey", "eurovision", "tambourine", "stockholm", "chess", "hootenanny", "polar", "honey", "money", "visitors", "chiquitita"];

//score keepers
var wins;
var remTries = 10;

//things we need to be able to write to the DOM
var outBlanks = document.getElementById("blanks");
var outRem = document.getElementById("outRem");
var userGuess = document.getElementById("userguess");



// var game = { --I'll put this back later
//selects a random word from the array
var guessMe = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log("the computer chose " + guessMe);
//the chosen word but each letter is an index in a new array
var answerArr = guessMe.split("");
console.log("Array version: " + answerArr);
//new array the same length but with underscores
var blankArray = [];
//a blank array to hold their guesses
var guessedLetters = [];

//turns the answer into a collection of blanks
function makeBlanks(arr) {
    for (i = 0; i < arr.length; i++) {
        blankArray[i] = "_";
    }
}
makeBlanks(answerArr);
console.log("Answer will be " + blankArray);
//prints the contents of the blank array
outBlanks.textContent = blankArray.join(" ");

function resetGame() {
    guessedLetters = [];
    userGuess.textContent = "";
    //empties array of guesses when they fail 10 times
    remTries = 10;
    outRem.textContent = remTries;
    //new game means ten more tries
    guessMe = wordBank[Math.floor(Math.random() * wordBank.length)];
    console.log("The computer chose " + guessMe);
    answerArr = guessMe.split("");
    //computer picks a new letter
    makeBlanks(answerArr);
    outBlanks.textContent = blankArray.join(" ");



}

//read user's guess and assign it to an array
document.onkeyup = function (event) {
    var theirGuess = event.key.toLowerCase();
    if (((alphabet.indexOf(theirGuess) !== -1))
        && (guessedLetters.indexOf(theirGuess) === -1)) {
        console.log("The user has chosen " + theirGuess);
        //doesn't count keystrokes that aren't in the alphabet array
        //doesn't count keystrokes that ARE in the guesses array

        //selected answer doesn't match array and they have turns left:
        if (((answerArr.indexOf(theirGuess) === -1)) && (remTries !== 1)) {
            guessedLetters.push(theirGuess);
            //adds wrong guess to the array
            remTries--;
            outRem.textContent = remTries;
            //subtracts a turn
            console.log("so far they've guessed " + guessedLetters);
            userGuess.textContent = guessedLetters;
        }

        //failure last turn wipes the game
        else if (remTries === 1) {
            resetGame();
        }

        //if they guess right
        else if (answerArr.indexOf(theirGuess) !== -1) {
            console.log("Good guess!");

            //collects the position of each occurrence of theirGuess in the answer array
            var position = [];
            //loops through the answer array
            for (var i = 0; i < answerArr.length; i++) {
                if (theirGuess === answerArr[i]) {
                    position.push(i);
                    console.log("their guess is in " + position);
                }
            }
            //replaces the blank spot in the blank array with the letter
            for (var j = 0; j < position.length; j++) {
                blankArray.splice(position[j], 1, theirGuess.toUpperCase());
                console.log("blank array says " + blankArray);
            
            }

            outBlanks.textContent = blankArray.join(" ");

        }

    }
}






