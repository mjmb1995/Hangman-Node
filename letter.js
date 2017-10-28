//constructor function using the user input
function Letter(letter) {
	this.letter = letter
		
	this.output = function(lettersUsed) {
		if (lettersUsed.indexOf(this.letter) > -1) {
			//if this letter is in the already guessed array, return the letter
			return this.letter
		}
		//if not then return a blank
		return "_"
	}
}
// this is used in word.js
module.exports = Letter