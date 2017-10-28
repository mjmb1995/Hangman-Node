var inquirer = require("inquirer");
var Word = require("./word.js");

var lettersUsed = [];
var word = new Word();
var guessesLeft = 10;

//user input to start game
inquirer.prompt([{
		type: "confirm",
		message: "Want to play..\na spooky game of..\nHANGMAN?",
		name: "ready"
	}]).then(function(userInput) {
		//if yes, start game
		if (userInput.ready) {
			console.log("I hope you're ready for the scariest challenge of your life!");
			startGame();
		} else {
			console.log("Hope you come back soon!");
		}
	});

// restarts the game when player loses
function restart(userInput) {
	if (userInput.continue) {
		//resets game variables
		lettersUsed = []
		word = new Word()
		guessesLeft = 10
		startGame()
		return
	} else {
		console.log("Feel free to come back at any time!")
	}
}


function startGame() {
	console.log(word.output(lettersUsed))
	inquirer.prompt([{
			type: "input",
			message: "Type a letter to guess",
			name: "letter"
		}]).then(function(userInput) {
			// when letter guessed again tell user they can not use it again
			if (lettersUsed.indexOf(userInput.letter) > -1) {
				console.log("You already used that letter. Try again..");
				startGame()
				return
			}

			lettersUsed.push(userInput.letter)
			// when the word is successfuly guessed, level 2 starts with only 5 guesses
			if (word.output(lettersUsed) === word.currentWord) {
				console.log("Great job! The word was: " + word.currentWord);
				console.log("That was too easy.\nThis time you only have 5 guesses.")
				lettersUsed = [];
				word = new Word();
				guessesLeft = 5;
				startGame()
				return

			} else {
				// lose a guess if the letter is not in the word
				if (!word.contains(userInput.letter)) {
					guessesLeft -= 1
				}

				// lose the game when user runs out of guesses
				if (guessesLeft === 0) {
					console.log("That was too bad, you ran out of guesses. The word was: " + word.currentWord);
					// user can play again with 10 guesses
					console.log("If you play again, I will give you 10 guesses!");
					// ask user if they want to play again
					inquirer.prompt([{
							type: "confirm",
							message: "Would you like to try again?",
							name: "continue"
						}])
						.then(restart)

				} else {
					console.log("You have " + guessesLeft + " guesses left!")
					startGame()
				}
			}

		})
}

