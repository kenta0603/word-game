const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ランダムな単語を選択する関数
function chooseWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

// アンダーバーで単語を表現する関数
function createDisplayWord(word) {
  return Array(word.length).fill("_");
}

// 入力された文字が単語に含まれるかチェックし、対応する位置のアンダーバーを置き換える関数
function guessLetter(word, guessedWord, letter) {
  const newGuessedWord = [...guessedWord];
  let letterFound = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter && newGuessedWord[i] === "_") {
      newGuessedWord[i] = letter;
      letterFound = true;
    }
  }
  return [letterFound, newGuessedWord];
}

// 以下はその他のゲームのロジック
const words = [
  "apple",
  "banana",
  "orange",
  "grape",
  "lemon",
  "strawberry",
  "blueberry",
  "peach",
  "kiwi",
  "watermelon",
];
const targetWord = chooseWord(words);
let displayWord = createDisplayWord(targetWord);
const MAX_TRIES = 5;
let triesLeft = MAX_TRIES;

console.log("単語あてゲームを開始します！");
gameLoop();

function gameLoop() {
  console.log(displayWord.join(" "));
  console.log(`残り失敗可能数: ${triesLeft}`);

  if (!displayWord.includes("_")) {
    console.log(`勝利！単語は ${targetWord} でした！`);
    rl.close();
    return;
  }

  if (triesLeft <= 0) {
    console.log(`残念！単語は ${targetWord} でした。`);
    rl.close();
    return;
  }

  rl.question("アルファベットを1文字入力してください: ", (input) => {
    const letter = input.toLowerCase();
    if (letter.length !== 1 || !/^[a-z]$/.test(letter)) {
      console.log("無効な入力です。アルファベット1文字で入力してください。");
      gameLoop();
      return;
    }

    const [letterFound, newDisplayWord] = guessLetter(targetWord, displayWord, letter);
    displayWord = newDisplayWord;

    if (!letterFound) {
      triesLeft--;
    }

    gameLoop();
  });
}

module.exports = { chooseWord, createDisplayWord, guessLetter };