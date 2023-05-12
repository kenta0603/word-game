const { chooseWord, createDisplayWord, guessLetter } = require('./index');

test('chooseWord selects a word from the list', () => {
  const words = ['apple', 'banana', 'orange'];
  const word = chooseWord(words);
  expect(words).toContain(word);
});

test('createDisplayWord creates an array of underscores', () => {
  const word = 'apple';
  const displayWord = createDisplayWord(word);
  expect(displayWord).toEqual(['_', '_', '_', '_', '_']);
});

test('guessLetter reveals letter if present', () => {
  const word = 'apple';
  const guessedWord = ['_', '_', '_', '_', '_'];
  const letter = 'a';
  const [letterFound, newGuessedWord] = guessLetter(word, guessedWord, letter);
  expect(letterFound).toBe(true);
  expect(newGuessedWord).toEqual(['a', '_', '_', '_', '_']);
});

test('guessLetter does not reveal letter if not present', () => {
  const word = 'apple';
  const guessedWord = ['_', '_', '_', '_', '_'];
  const letter = 'z';
  const [letterFound, newGuessedWord] = guessLetter(word, guessedWord, letter);
  expect(letterFound).toBe(false);
  expect(newGuessedWord).toEqual(['_', '_', '_', '_', '_']);
});
