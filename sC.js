/**
 * sC.js - JavaScript Object for simple monoalphabetic substitution ciphers
 * @type {Object}
 * @namespace
 */
var sC = {

        /**
         * alphabet Plaintext alphabet, all caps A-Z
         * @type {String}
         */
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        /**
         * cipherAlphabet The substituted alphabet used to create 'secret' message
         * @type {String}
         */
        cipherAlphabet: "",

        /**
         * ciphertext The 'secret' message
         * @type {String}
         */
        ciphertext: "",

        /**
         * keyword The 'word' used to build the cipher alphabet
         * @type {String}
         */
        keyword: "",

        /**
         * plaintext The real, original message
         * @type {String}
         */
        plaintext: "",

        /**
         * buildCipherAlphabet Use keyword to create the substitution alphabet
         */
        buildCipherAlphabet : function buildCipherAlphabet() {

            "use strict";

            var key = this.keyword + this.alphabet;

            this.cipherAlphabet = this.distillUniqueUpperAlphas(key);
        },

        /**
         * buildKeyword convert password/phrase into uppercase string of unique letters
         * @param {String} key A password or passphrase
         */
        buildKeyword : function buildKeyword(key) {

            "use strict";

            this.keyword = this.distillUniqueUpperAlphas(key);

            this.buildCipherAlphabet();
        },

        /**
         * decrypt convert the 'secret' message into a plain message
         * @param  {string} ciphertext the 'secret' message
         * @return {string}            the plain message
         */
        decrypt : function decrypt(ciphertext) {

            "use strict";

            var x, plaintext = "";
            this.ciphertext = ciphertext;

            for (x = 0; x < ciphertext.length; x += 1) {
                if (this.alphabet[this.cipherAlphabet.indexOf(ciphertext[x].toUpperCase())] === undefined) {
                    plaintext += ciphertext[x];
                } else {
                    plaintext += this.alphabet[this.cipherAlphabet.indexOf(ciphertext[x].toUpperCase())];
                }
            }

            this.plaintext = plaintext;

            return plaintext;
        },

        /**
         * distillUniqueUpperAlphas Internal utility function, filter out non-alphas, make all caps, remove redundant characters
         * @param {String} phrase Password/phrase, or keyword and plaintext alphabet
         */
        distillUniqueUpperAlphas: function (phrase) {

            "use strict";

            var x, result = "";

            phrase = phrase.match(/[a-zA-Z]/g);
            phrase = phrase.toString();
            phrase = phrase.replace(/[,]/g, "");
            phrase = phrase.toUpperCase();

            // filter out duplicate letter values
            for (x = 0; x < phrase.length; x += 1) {
                if (phrase.indexOf(phrase[x]) === x) {
                    result += phrase[x];
                }
            }

            return result;
        },

        /**
         * encrypt convert plaintext into ciphertext
         * @param  {string} plaintext the plain message
         * @return {string}           the 'secret' message
         */
        encrypt : function encrypt(plaintext) {

            "use strict";

            var x, ciphertext = "";
            this.plaintext = plaintext;

            for (x = 0; x < plaintext.length; x += 1) {

                if (this.cipherAlphabet[this.alphabet.indexOf(plaintext[x].toUpperCase())] === undefined) {
                    ciphertext += plaintext[x];
                } else {
                    ciphertext += this.cipherAlphabet[this.alphabet.indexOf(plaintext[x].toUpperCase())];
                }
            }

            this.ciphertext = ciphertext;

            return ciphertext;
        },

        /**
         * ROT rotate plaintext alphabet by x places (e.g. ROT-13)
         * @param {integer} positions a number from 1 to alphabet.length (26)
         */
        ROT : function rotate(positions) {

            "use strict";

            var keyword = this.alphabet.substr(positions);

            this.buildKeyword(keyword);
        },

        /**
         * removeSpaces eliminates spaces in-between words of ciphertext
         */
        removeSpaces : function removeSpaces() {

            "use strict";

            var result = this.ciphertext.replace(/\s/g, "");

            this.ciphertext = result;

            return this.ciphertext;

        }
    };
