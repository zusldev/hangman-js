const input = require('prompt-sync')();
const WORDS = [
  'python',
  'java',
  'swift',
  'javascript'
]
let string = 'HANGMAN'
let splitText = string.split("").join(" ");
console.log(splitText);
console.log('');

let rndm = Math.floor(Math.random() * WORDS.length);


// replaceLetter function
function replaceLetter(guess, hiddenWord, letter) {
  let newHiddenWord = '';
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === letter) {
      newHiddenWord += letter;
    } else {
      newHiddenWord += hiddenWord[i];
    }
  }
  return newHiddenWord;
}


let word = WORDS[rndm];
let guess = word;
let guessLimit = 0;
let arr = [];
const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
let wins = 0;
let losses = 0;
let exit = false;


while (exit != true) {
  let ask = input('Type "play" to play the game, "results" to show the scoreboard, and "exit" to quit:');
  switch (ask) {
    case 'play':
      playGame();
      break;
    case 'results':
      results();
      break;
    case 'exit':
      console.log('Bye!');
      exit = true;
      break;
    default:
      console.log('Invalid input');
  }

}


function playGame() {
  let hiddenWord = guess.replace(/./g, '-');
  do {
    console.log(hiddenWord);
    let ask = input('Input a letter:');
    if (validateLetter(ask) === false) {
      continue;
    } else {
      if (specialChars.test(ask)) {
        console.log('Please, enter a lowercase letter from the English alphabet.');
        continue;
      }
      if (guess.includes(ask)) {
        hiddenWord = replaceLetter(guess, hiddenWord, ask);
      } else {
        guessLimit++;
        console.log("That letter doesn't appear in the word.");
      }
      if (hiddenWord === guess) {
        console.log(hiddenWord);
        console.log(`You guessed the word ${hiddenWord}!`);
        console.log("You survived!");
        wins++;
        guessLimit = 0;
        arr = [];
        break;
      }
      if (guessLimit === 8) {
        console.log('You lost!');
        losses++;
        break;
      }
    }
    arr.push(ask);
  } while (guessLimit <= 8);
}

function results() {
  console.log(`You won: ${wins} times.`);
  console.log(`You lost: ${losses} times.`);
}

function validateLetter(letter) {
  if (letter.length > 1 || letter.length === 0) {
    console.log("Please, input a single letter.");
    return false;
  }
  if (letter !== letter.toLowerCase()) {
    console.log('Please, enter a lowercase letter from the English alphabet.');
    return false;
  }
  if (arr.includes(letter)) {
    console.log("You've already guessed this letter.");
    return false;
  }

  return true;
}