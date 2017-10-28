var Letter = require("./letter.js")
var spookyWordBank = ["afraid", "apparition", "bat", "bloodcurdling", "bones", "cadaver", "casket",
					"couldron", "cemetery", "eerie", "fangs", "ghost", "ghoul", "goblin", "haunted",
					"howl", "shadow", "spider", "nightmare"
					]

//function grabs a random word from the spookyWordBank
function selectRandomWord(array) {
	spookyWord = array[Math.floor(Math.random() * array.length)];
	return spookyWord
}


function createArrayOfLetters(currentWord) {
	letterObjectArray = []
	for (var i = 0; i < currentWord.length; i++) {

		letterObjectArray.push(new Letter(currentWord[i]));
	}
	return letterObjectArray
}

//constructor creates a word object when called using the word bank
function Word() {
	this.currentWord = selectRandomWord(spookyWordBank);
	this.letters = createArrayOfLetters(this.currentWord);

}

Word.prototype.contains = function(letter) {
		for (var i = 0; i < this.letters.length; i++) {
			if (letter === this.letters[i].letter) {
				return true
			}
		}
		return false
	}

Word.prototype.output = function(lettersUsed) {
		//loop through letters array, on each letter call letter.output
		//and add that to output array
		var output = ""

		for (var i = 0; i < this.letters.length; i++) {
			output = output + this.letters[i].output(lettersUsed);
		}
		return output
	}

//this is used in game.js
module.exports = Word