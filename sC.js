/*

	Name: sC (short for Substitution Cipher)
	Purpose: I make playing with simple substitution ciphers easy and fun.

	Example Usage:

	sC.buildKeyword("The Doctor Dances");
	console.log(sC.keyword); // outputs THEDOCRANS
	console.log(sC.alphabet); // outputs ABCDEFGHIJKLMNOPQRSTUVWXYZ
	console.log(sC.cipherAlphabet); // outputs THEDOCRANSBFGIJKLMPQUVWXYZ

	sC.encrypt("Now is the time for all good people to come to the aid of their party.");
	console.log(sC.ciphertext);
	// outputs "IJW NP QAO QNGO CJM TFF RJJD KOJKFO QJ EJGO QJ QAO TND JC QAONM KTMQY "

	sC.decrypt("IJW NP QAO QNGO CJM TFF RJJD KOJKFO QJ EJGO QJ QAO TND JC QAONM KTMQY ");
	// outputs "NOW IS THE TIME FOR ALL GOOD PEOPLE TO COME TO THE AID OF THEIR PARTY ");

*/

var sC = {

	// properties

	alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	cipherAlphabet: "",
	ciphertext: "",
	keyword: "",
	plaintext: "",

	// methods
	buildCipherAlphabet : function buildCipherAlphabet() {

		var result = "";

		var key = this.keyword + this.alphabet;

		result = this.distillUniqueUpperAlphas(key);

		this.cipherAlphabet = result;
	},

	buildKeyword : function buildKeyword(key) {

		var result = "";

		result = this.distillUniqueUpperAlphas(key);

		this.keyword = result;

		this.buildCipherAlphabet();
	},

	decrypt : function decrypt(ciphertext) {

		var plaintext = "";
		this.ciphertext = ciphertext;

		for (x = 0; x < ciphertext.length; x++) {
			if ( this.alphabet[this.cipherAlphabet.indexOf(ciphertext[x].toUpperCase())] == undefined )
			{
				plaintext += ciphertext[x];
			}
			else
			{
				plaintext += this.alphabet[this.cipherAlphabet.indexOf(ciphertext[x].toUpperCase())];
			}
		}

		this.plaintext = plaintext;
		return plaintext;
	},

	distillUniqueUpperAlphas: function(phrase) {

		var result = "";

		phrase = phrase.replace(/[^a-zA-Z]/g, "");
		phrase = phrase.toUpperCase();

		// filter out duplicate letter values
		for (var x = 0; x < phrase.length; x++) {
			if (phrase.indexOf(phrase[x]) == x) {
				result += phrase[x];
			}
		}

		return(result);
	},

	encrypt : function encrypt(plaintext) {

		var ciphertext = "";
		this.plaintext = plaintext;

		for (x = 0; x < plaintext.length; x++) {

			if ( this.cipherAlphabet[this.alphabet.indexOf(plaintext[x].toUpperCase())] == undefined )
			{
				ciphertext += plaintext[x];
			}
			else
			{
				ciphertext += this.cipherAlphabet[this.alphabet.indexOf(plaintext[x].toUpperCase())];
			}
		}

		this.ciphertext = ciphertext;
		return ciphertext;
	}
};
