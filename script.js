let level = 1;
const level1Cards = [
  '🍎', '🍌', '🍇', '🍒',
  '🍎', '🍌', '🍇', '🍒',
  '🚗', '🚕', '🚗', '🚕'
];
const level2Cards = level1Cards.concat([
  '🍉', '🍑', '🍍', '🥝',
  '🍉', '🍑', '🍍', '🥝'
]);
let cards = level1Cards;
let flippedCards = [];
let matchedPairs = 0;
let countdown;

// Keverés
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const board = document.getElementById('gameBoard');
const timerEl = document.getElementById('timer');

function createBoard() {
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    card.addEventListener('click', () => {
      if (
        card.classList.contains('flipped') ||
        card.classList.contains('matched') ||
        flippedCards.length === 2
      ) return;

      card.classList.add('flipped');
      card.textContent = emoji;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;

        if (first.dataset.emoji === second.dataset.emoji) {
          first.classList.add('matched');
          second.classList.add('matched');
          flippedCards = [];
          matchedPairs++;
          if (matchedPairs === cards.length / 2) {
            if (level === 1) {
              level = 2;
              cards = level2Cards;
              matchedPairs = 0;
              flippedCards = [];
              timeLeft = 5 * 60;
              timerEl.textContent = '05:00';
              clearInterval(countdown);
              document.querySelector('.game-board').classList.add('level2');
              while (board.firstChild) {
                board.removeChild(board.firstChild);
              }
              shuffle(cards);
              createBoard();
              startCountdown();
            } else {
              setTimeout(() => alert('🎉 Gratulálok! Nyertél az összes szinten!'), 300);
            }
          }
        } else {
          setTimeout(() => {
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            first.textContent = '';
            second.textContent = '';
            flippedCards = [];
          }, 1000);
        }
      }
    });

    board.appendChild(card);
  });
}

function startCountdown() {
  countdown = setInterval(() => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerEl.textContent = `${minutes}:${seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(countdown);
      alert('⏰ Idő lejárt!');
      // opcionális: újratöltés
      // location.reload();
    }
  }, 1000);
}

// VISSZASZÁMLÁLÓ 5 PERC
let timeLeft = 5 * 60; // 5 perc másodpercben

shuffle(cards);
createBoard();
startCountdown();