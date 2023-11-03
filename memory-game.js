"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
]; // generates an array with the initial colors

let colorFrequencies = {
  "blue" : 0,
  "red" : 0,
  "green" : 0,
  "orange" : 0,
  "purple" : 0
} // initializes an object with the amount of flipped cards in a given array

let colorIDsArr = []; // I'll populate this array with ids to make ID assignments easier
// id assignment will happen in createCards() function


const colors = shuffle(COLORS); // shuffles the COLORS array and stores it with the name 'colors'

createCards(colors); // sends colors array to the createCards() function

/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const oneCard = document.createElement('div'); // creates div for card

    // this if-else statement assigns each card with an id
    if (!!colorIDsArr.includes(`${color}1`)) { // if the first card of this color was already created, make it card 2
      oneCard.id = `${color}2`;
      colorIDsArr.push(`${color}2`); // adds it to array
    }
    else {
      oneCard.id = `${color}1`; // or makes its id color1
      colorIDsArr.push(`${color}1`); // adds it to array
    }

    oneCard.classList.add(color); // makes the card's class its color
    oneCard.classList.add('aCard'); // adds the class 'aCard'
    oneCard.classList.add('unflipped'); // adds the class unflipped
    oneCard.classList.add('unlocked'); // allows a card to be modified
    gameBoard.append(oneCard); // appends the card to the gameboard div element! // also send color name for the sake of handleClickCard obj
    // now that I've created the card, I need to add an event listener to go to the handleCardClick function
    oneCard.addEventListener('click', e => {
      if (oneCard.classList.contains('unlocked')) {
        handleCardClick(e, color);
      }
      else {
        console.log('the card you clicked is locked'); // test this out soon after dinner!
      }
    }); // this is what triggers when a card is clicked
    //oneCard.addEventListener('click', handleCardClick(e)); // figure out proper syntax but this would send it to the function
    // missing code here ...
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt, col) { // beautiful -- this sends the name of the color through which really matters
  console.log(`this is the ${col} and this is the ${evt}`);
  console.log(evt.classList);
  // ... you need to write this ...
}


/* to change # of flipped cards and max it at 2, write a conditional and also set a global variable
that initializes flipCount

let flipCount = 0; // this will start the flip count

every time a card is flipped, +1;
everytime a card is unflipped, -1;


will players be allowed to unflip a card before submitting a guess? Is that up to you or could
it be later in the instructions?
*/