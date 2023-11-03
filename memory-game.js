"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
]; // generates an array with the initial colors

let realColors = { // the colors to change things to as needed
  "blue" : 'rgb(98, 98, 236)',
  "red" : 'rgb(237, 80, 80)',
  "green" : 'rgb(67, 129, 67)',
  "orange" : 'rgb(241, 177, 59)',
  "purple" : 'rgb(137, 0, 137)'
}

let colorIDsArr = []; // I'll populate this array with ids to make ID assignments easier
// id assignment will happen in idCreator() function


// relevant variables for a flipped card that has yet to be matched
let numActive = 0; // this represents the number of active cards that are flipped
let activeCardsIDs = []; // an array of the currently active card's id's
let activeCardsColorClass = []; // array of the currently active card's color class

const colors = shuffle(COLORS); // shuffles the COLORS array and stores it with the name 'colors'

createCards(colors); // sends colors array to the createCards() function

/** Create interactive button to reload the page */
/* An optional task for later!
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('onclick', function() {
    location.reload;
  });
});
*/

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

function createCards(colors) {
  const gameBoard = document.getElementById("game"); // this is what we'll append the card to
  for (let color of colors) {
    const oneCard = document.createElement('div'); // creates div for card
    oneCard.id = idCreator(color); // calls function that generates an id for each specific card
    oneCard.style.backgroundColor = "rgb(248, 245, 215)"; // set the unflipped color
    oneCard.classList.add(color); // add class of the card's color
    gameBoard.append(oneCard); // appends the card to the gameboard div element
    oneCard.addEventListener('click', handleCardClick); // when card is clicked, handleCardClick triggers
  }
}

/** This function creates an id for each distinct card in the array. */
function idCreator(colorVal) {
  if (!!colorIDsArr.includes(`${colorVal}1`)) { // if first card of this color was already created, make it card 2
    colorIDsArr.push(`${colorVal}2`);
    return `${colorVal}2`;
  }
  else {
    colorIDsArr.push(`${colorVal}1`); // or makes its id color1
    return `${colorVal}1`;
  }
}

/** Flip a card face-up. */
function flipCard(card, colorToAdd) {
  // update the card's background based on it's actual hidden color
  card.style.backgroundColor = `${realColors[colorToAdd]}`;
}

/** Flip a card face-down. */
function unFlipCard(firstID, secondID) {
  // grab both of the elements to unflip
  let cardOne = document.getElementById(firstID);
  let cardTwo = document.getElementById(secondID);
  cardOne.style.backgroundColor = "rgb(248, 245, 215)";
  cardTwo.style.backgroundColor = "rgb(248, 245, 215)"; // resets the styles of both cards
}



/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(event) {
  // gather info about the event
  const theCard = event.target; // this grabs the element
  const cardID = theCard.id; // this is its id
  const cardColor = cardID.slice(0, cardID.length - 1); // this is its class & its color

  if (numActive < 2){ // ensures things will only happen if there's 0 or 1 active cards
    numActive++; // a card was just clicked on, so add to number of active cards in play

    // LATER, add a time delay here!
    flipCard(theCard, cardColor); // flip over the card that was just clicked

    // numActive is either 1 or 2

    if (numActive === 1) { // if it's 1, all you need to do is add info
      activeCardsIDs.push(cardID); // adds card id to the array
      activeCardsColorClass.push(cardColor); // adds color to the array
    }

    else if (numActive === 2) { // but if it's 2, you need to check to see if they match!
      if ((cardColor == activeCardsColorClass[0]) && (cardID != activeCardsIDs[0])) {
        // if it's a match, alert the player
        console.log('you found a match!');
        // remove the events from each of those cards
        // first removal is easy, it's the card you had before
        theCard.removeEventListener('click', handleCardClick); // testing out removing ability
        // second removal requires retrieving the element
        let secondElement = document.getElementById(`${activeCardsIDs[0]}`);
        secondElement.removeEventListener('click', handleCardClick); // removes from second element
      }
      else {
        // otherwise, it wasn't a match
        console.log('sorry bud, that\'s not a match');
        unFlipCard(cardID, activeCardsIDs[0]); // sends ids of the 2 cards to unflip array
      }
      // either way, you need to reset the saved information
      numActive = 0; // reset num active
      activeCardsColorClass = []; // reset class array
      activeCardsIDs = []; // reset ids array
    }
    // in the case of 2 you need to clear out the array
    // if cards need to be unflipped you can get element by id! super convenient






  }




  console.log('you clicked on a card!');
  console.log(`the card's id is ${theCard.id} and its color is ${cardColor}`);


  /* IMPORTANT
  const theCard = event.target;
  theCard.removeEventListener('click', handleCardClick); // testing out removing ability
  this is what I'll use (in some capacity) to make cards unclickable after they're out of use!
  */

  // ... you need to write this ...
}


/*
there is in fact a way to theoretically unflip a card you didn't want to flip over, but i don't think that's how
memory normally works (there's no takesies backsies)

current priority is to figure out how the timer works because it's automatically reseting it without showing you the failing

also make a congratulatory message to the winner once they've won


to change # of flipped cards and max it at 2, write a conditional and also set a global variable
that initializes flipCount

let flipCount = 0; // this will start the flip count

every time a card is flipped, +1;
everytime a card is unflipped, -1;


will players be allowed to unflip a card before submitting a guess? Is that up to you or could
it be later in the instructions?

old add event listener function

oneCard.addEventListener('click', e => {
      handleCardClick(e, color, oneCard.id, oneCard);
      /* ignore locking and unlocking for now
      if (oneCard.classList.contains('unlocked')) {
        handleCardClick(e, color);
      }
      else {
        console.log('the card you clicked is locked'); // test this out soon after dinner!
      }


      oneCard.addEventListener('click', function() {
        handleCardClick(color, oneCard.id, oneCard);

      so previously I was sending all this information through, but I think that's a bit much.
      ideally i should be able to find all that information knowing the event itself

      look into that to see if that is possible!

*/