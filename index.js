const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
// words の中からランダムに単語を選択
const targetWord = words[Math.floor(Math.random() * words.length)];
// targetWord の文字数分のアンダーバーを表示
const displayWord = Array(targetWord.length).fill("_");
// プレイヤーが間違えられる回数
const MAX_TRIES = 5;
// プレイヤーが間違えた回数
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

    let letterFound = false;
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord[i] === letter && displayWord[i] === "_") {
        displayWord[i] = letter;
        letterFound = true;
      }
    }

    if (!letterFound) {
      triesLeft--;
    }

    gameLoop();
  });
}
