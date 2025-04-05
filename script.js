const symbols = ['🌟', '🎉', '❤️', '🚀', '🎁', '💡', '⚡', '🍎'];
const cards = [...symbols, ...symbols];
const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const resetButton = document.getElementById('reset');

let flippedCards = [];
let moves = 0;
let canFlip = true;

// Initialize the game
function initGame() {
    cards.sort(() => Math.random() - 0.5);
    grid.innerHTML = '';
    
    cards.forEach((symbol) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-symbol', symbol);
        
        // Add inner elements for flip animation
        const cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.textContent = symbol; // Symbol is hidden here
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (!canFlip || flippedCards.includes(this) || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

// Rest of the JavaScript remains the same (checkMatch, checkWin, reset)
// ... (Keep the checkMatch, checkWin, and reset functions unchanged from the previous code)
// Check if two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.symbol === card2.dataset.symbol;

    if (match) {
        flippedCards = [];
        canFlip = true;
        checkWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Check if all pairs are found
function checkWin() {
    const allCards = document.querySelectorAll('.card');
    const matchedCards = [...allCards].filter(card => card.classList.contains('flipped'));

    if (matchedCards.length === allCards.length) {
        alert(`You won in ${moves} moves!`);
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    moves = 0;
    movesDisplay.textContent = moves;
    flippedCards = [];
    initGame();
});

// Start the game
initGame();