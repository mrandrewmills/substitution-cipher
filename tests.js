QUnit.test( "default values initialization", function(assert) {
  assert.equal(sC.alphabet, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "We expect to see alphabet in all caps.");
  assert.equal(sC.cipherAlphabet, "", "We expect to see no value assigned.");
  assert.equal(sC.ciphertext, "", "We expect to see no value assigned.");
  assert.equal(sC.keyword, "", "We expect to see no value assigned.");
  assert.equal(sC.plaintext, "", "We expect to see no value assigned.");
});

QUnit.test( "check buildKeyword", function(assert) {
  var passPhrase = "The Doctor Dances.";
  sC.buildKeyword(passPhrase);

  assert.equal(sC.keyword, "THEDOCRANS", "We expect ALL CAPS, unique letters, no non-alphas.");
});
