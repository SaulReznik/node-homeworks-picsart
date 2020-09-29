const readline = require("readline");

const hangmanArray = [
  `--------
  |    |   
  |       
  |        
  |        
  |        
  |_________`,
  `--------
  |    |   
  |    O  
  |        
  |        
  |        
  |_________`,
  `--------
  |    |   
  |    O  
  |    |   
  |        
  |        
  |_________`,
  `--------
  |    |   
  |    O  
  |   /|   
  |        
  |        
  |_________`,
  `--------
  |    |   
  |    O  
  |   /|\\  
  |        
  |        
  |_________`,
  `--------
  |    |   
  |    O  
  |   /|\\  
  |    |   
  |        
  |_________`,
  `--------
  |    |   
  |    O  
  |   /|\\  
  |    |   
  |   /    
  |_________`,
  `--------
  |    |   
  |    O  
  |   /|\\  
  |    |   
  |   / \\  
  |_________`
];

//Creating inctanse of readline with our settings
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Guess the famous FPS Game> "
});

const asterixCreator = num => "*".repeat(num);

let attempts = 0;
const word = "half life";
const attemptedLetters = [];
let hiddenWord = asterixCreator(word.length);

//Init logging
console.log("Number of sybols ->", hiddenWord.length);
console.log("The Word ->", hiddenWord);
console.log(hangmanArray[attempts]);
rl.prompt();

rl.on("line", rawAttempt => {
  const attempt = rawAttempt.toLowerCase();

  //Input should be only one letter, not a duplicate and must be included in our word
  if (
    attempt.length === 1 &&
    word.includes(attempt) &&
    !hiddenWord.includes(attempt)
  ) {
    //Createing new hidden word with the opened letters
    const wordArray = hiddenWord.split("").map((letter, index) => {
      if (attempt === word[index]) {
        return attempt;
      } else if (letter !== "*") {
        return letter;
      }

      return "*";
    });

    hiddenWord = wordArray.join("");
  } else {
    //Otherwise add attempt number by one
    //And if we don't have the current symbol in our attempted letters
    //then add it
    attempts++;
    if (!attemptedLetters.includes(attempt)) {
      attemptedLetters.push(attempt);
    }
  }

  //Regular log
  console.log(`Attempted Letters -> {${attemptedLetters.join()}}`);
  console.log("Number of sybols ->", hiddenWord.length);
  console.log("The Word ->", hiddenWord);
  console.log(hangmanArray[attempts]);

  if (hiddenWord !== word) {
    if (attempts < 7) {
      rl.prompt();
    } else {
      console.log(`You lose pal, the word was - ${word}`);
      rl.close();
    }
  } else {
    console.log("Yay, you won!!!");
    rl.close();
  }
}).on("close", () => {
  process.exit(0);
});
