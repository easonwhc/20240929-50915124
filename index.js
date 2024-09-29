const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton');
const themeSelect = document.getElementById('themeSelect');
const timerDisplay = document.getElementById('timer');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let countdownTimer;

// 主題圖片路徑
const themes = {
    animals: [
        'images/animals/card1.jpg', 'images/animals/card5.jpg',
        'images/animals/card2.jpg', 'images/animals/card6.jpg',
        'images/animals/card3.jpg', 'images/animals/card7.jpg',
        'images/animals/card4.jpg', 'images/animals/card8.jpg'
    ],
    fruits: [
        'images/fruits/card1.jpg', 'images/fruits/card5.jpg',
        'images/fruits/card2.jpg', 'images/fruits/card6.jpg',
        'images/fruits/card3.jpg', 'images/fruits/card7.jpg',
        'images/fruits/card4.jpg', 'images/fruits/card8.jpg'
    ]
};

// 洗牌函式
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 創建卡片
function createCard(imagePath) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div');
    front.classList.add('front');
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = "Card Image";
    front.appendChild(img);

    const back = document.createElement('div');
    back.classList.add('back');

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', flipCard);
    return card;
}

// 卡片翻轉邏輯
function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

// 檢查是否配對成功
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.querySelector('img').src === card2.querySelector('img').src) {
        matchedPairs++;
        if (matchedPairs === 8) {
            alert('恭喜你贏了！');
            resetGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

// 開始遊戲
function startGame() {
    resetGame(); // 開始遊戲前先重置狀態

    const selectedTheme = themeSelect.value;
    const cardValues = [...themes[selectedTheme], ...themes[selectedTheme]];
    const shuffledValues = shuffle(cardValues);

    cards = shuffledValues.map(createCard);
    cards.forEach(card => gameBoard.appendChild(card));

    startButton.textContent = '重新開始';
    startCountdown(10);
}

// 倒數計時
function startCountdown(seconds) {
    timerDisplay.textContent = `${seconds} 秒後翻牌`;
    countdownTimer = setInterval(() => {
        seconds--;
        timerDisplay.textContent = `${seconds} 秒後翻牌`;
        if (seconds <= 0) {
            clearInterval(countdownTimer);
            showAllCards();
        }
    }, 1000);
}

// 顯示所有卡片，然後隱藏
function showAllCards() {
    cards.forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('flipped'));
        timerDisplay.textContent = '開始遊戲！';
    }, 2000);
}

// 重置遊戲
function resetGame() {
    clearInterval(countdownTimer);
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    isGameStarted = true; // 確保重新開始後，遊戲可以順利進行
    timerDisplay.textContent = '準備開始';
}

// 綁定事件監聽器
startButton.addEventListener('click', startGame);
themeSelect.addEventListener('change', resetGame); // 切換主題時自動重置遊戲

// 初始設置
resetGame();
