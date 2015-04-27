/**
 * sC.js - JavaScript Object for simple monoalphabetic substitution ciphers
 * @type {Object}
 * @namespace
 */
var sC = {

        /**
         * alphabet description
         * @type {String}
         */
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

        /**
         * cipherAlphabet description
         * @type {String}
         */
        cipherAlphabet: "",

        /**
         * ciphertext description
         * @type {String}
         */
        ciphertext: "",

        /**
         * keyword description
         * @type {String}
         */
        keyword: "",

        /**
         * plaintext description
         * @type {String}
         */
        plaintext: "",

        /**
         * buildCipherAlphabet description
         */
        buildCipherAlphabet : function buildCipherAlphabet() {

            "use strict";

            var key = this.keyword + this.alphabet;

            this.cipherAlphabet = this.distillUniqueUpperAlphas(key);
        },

        /**
         * buildKeyword description
         * @param {String} key description
         */
        buildKeyword : function buildKeyword(key) {

            "use strict";

            this.keyword = this.distillUniqueUpperAlphas(key);

            this.buildCipherAlphabet();
        },

        /**
         * decrypt description
         * @param  {string} ciphertext description
         * @return {string}            description
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
         * distillUniqueUpperAlphas description
         * @param {String} phrase description
         */
        distillUniqueUpperAlphas: function (phrase) {

            "use strict";

            var x, result = "";

            phrase = phrase.replace(/[^a-zA-Z]/g, "");
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
         * encrypt description
         * @param  {string} plaintext description
         * @return {string}           description
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
        }
    };
