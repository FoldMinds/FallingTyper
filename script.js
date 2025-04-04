const words = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 
                'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 
                'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
                'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 
                'る', 'れ', 'ろ', 'わ', 'を', 'ん', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ','マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン'];
const advancedWords = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
                       'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ',
                       'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'キャ', 'キュ', 'キョ',
                       'シャ', 'シュ', 'ショ', 'チャ', 'チュ', 'チョ',
                       'ニャ', 'ニュ', 'ニョ', 'ヒャ', 'ヒュ', 'ヒョ',
                       'ミャ', 'ミュ', 'ミョ', 'リャ', 'リュ', 'リョ'];
const romajiMap = {
    'あ': ['a'], 'い': ['i'], 'う': ['u'], 'え': ['e'], 'お': ['o'],
    'か': ['ka'], 'き': ['ki'], 'く': ['ku'], 'け': ['ke'], 'こ': ['ko'],
    'さ': ['sa'], 'し': ['shi', 'si'], 'す': ['su'], 'せ': ['se'], 'そ': ['so'],
    'た': ['ta'], 'ち': ['chi', 'ti'], 'つ': ['tsu', 'tu'], 'て': ['te'], 'と': ['to'],
    'な': ['na'], 'に': ['ni'], 'ぬ': ['nu'], 'ね': ['ne'], 'の': ['no'],
    'は': ['ha'], 'ひ': ['hi'], 'ふ': ['fu', 'hu'], 'へ': ['he'], 'ほ': ['ho'],
    'ま': ['ma'], 'み': ['mi'], 'む': ['mu'], 'め': ['me'], 'も': ['mo'],
    'や': ['ya'], 'ゆ': ['yu'], 'よ': ['yo'],
    'ら': ['ra'], 'り': ['ri'], 'る': ['ru'], 'れ': ['re'], 'ろ': ['ro'],
    'わ': ['wa'], 'を': ['wo'], 'ん': ['n'],
    'ア': ['a'], 'イ': ['i'], 'ウ': ['u'], 'エ': ['e'], 'オ': ['o'],
    'カ': ['ka'], 'キ': ['ki'], 'ク': ['ku'], 'ケ': ['ke'], 'コ': ['ko'],
    'サ': ['sa'], 'シ': ['shi', 'si'], 'ス': ['su'], 'セ': ['se'], 'ソ': ['so'],
    'タ': ['ta'], 'チ': ['chi', 'ti'], 'ツ': ['tsu', 'tu'], 'テ': ['te'], 'ト': ['to'],
    'ナ': ['na'], 'ニ': ['ni'], 'ヌ': ['nu'], 'ネ': ['ne'], 'ノ': ['no'],
    'ハ': ['ha'], 'ヒ': ['hi'], 'フ': ['fu', 'hu'], 'ヘ': ['he'], 'ホ': ['ho'],
    'マ': ['ma'], 'ミ': ['mi'], 'ム': ['mu'], 'メ': ['me'], 'モ': ['mo'],
    'ヤ': ['ya'], 'ユ': ['yu'], 'ヨ': ['yo'],
    'ラ': ['ra'], 'リ': ['ri'], 'ル': ['ru'], 'レ': ['re'], 'ロ': ['ro'],
    'ワ': ['wa'], 'ヲ': ['wo'], 'ン': ['n'],
    'が': ['ga'], 'ぎ': ['gi'], 'ぐ': ['gu'], 'げ': ['ge'], 'ご': ['go'],
    'ざ': ['za'], 'じ': ['ji', 'zi'], 'ず': ['zu'], 'ぜ': ['ze'], 'ぞ': ['zo'],
    'だ': ['da'], 'ぢ': ['ji', 'di'], 'づ': ['zu', 'du'], 'で': ['de'], 'ど': ['do'],
    'ば': ['ba'], 'び': ['bi'], 'ぶ': ['bu'], 'べ': ['be'], 'ぼ': ['bo'],
    'ぱ': ['pa'], 'ぴ': ['pi'], 'ぷ': ['pu'], 'ぺ': ['pe'], 'ぽ': ['po'],
    'キャ': ['kya'], 'キュ': ['kyu'], 'キョ': ['kyo'],
    'シャ': ['sha', 'sya'], 'シュ': ['shu', 'syu'], 'ショ': ['sho', 'syo'],
    'チャ': ['cha', 'tya'], 'チュ': ['chu', 'tyu'], 'チョ': ['cho', 'tyo'],
    'ニャ': ['nya'], 'ニュ': ['nyu'], 'ニョ': ['nyo'],
    'ヒャ': ['hya'], 'ヒュ': ['hyu'], 'ヒョ': ['hyo'],
    'ミャ': ['mya'], 'ミュ': ['myu'], 'ミョ': ['myo'],
    'リャ': ['rya'], 'リュ': ['ryu'], 'リョ': ['ryo']
};
let score = 0;
let lives = 3;
let activeBalloons = [];
let currentInput = '';
let paused = false;
let elapsedTime = 0;
let timerElement = document.getElementById('timer');
let timerInterval;
let balloonSpeed = 2;
let balloonSpawnInterval = 2000;

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    elapsedTime = 0;
    timerElement.textContent = elapsedTime;
    
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerElement.textContent = elapsedTime;
        
        // Every 10 seconds, increase difficulty
        if (elapsedTime % 10 === 0) {
            balloonSpeed += 0.5; // Increase falling speed
            balloonSpawnInterval = Math.max(500, balloonSpawnInterval - 200); // Increase spawn rate
        }
    }, 1000);
}

function endGame() {
    alert("ゲーム終了！スコア: " + score);
    restartGame();
}

function createBalloon() {
    if (lives <= 0 || paused) return;

    let balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // Introduce harder words as time progresses
    let randomWord = elapsedTime > 20 && Math.random() < 0.3 
                     ? advancedWords[Math.floor(Math.random() * advancedWords.length)]
                     : words[Math.floor(Math.random() * words.length)];

    balloon.textContent = randomWord;

    let balloonLeftPosition = Math.random() * 360;  // Random horizontal position for the balloon

    // Check if the new balloon's position overlaps with any existing balloons
    let isColliding = false;
    activeBalloons.forEach((balloonInArray) => {
        if (Math.abs(balloonLeftPosition - parseFloat(balloonInArray.element.style.left)) < 60) {  // 60px threshold for collision detection
            isColliding = true;
        }
    });

    // If collision detected, generate a new position until it's non-colliding
    while (isColliding) {
        balloonLeftPosition = Math.random() * 360;
        isColliding = false;
        activeBalloons.forEach((balloonInArray) => {
            if (Math.abs(balloonLeftPosition - parseFloat(balloonInArray.element.style.left)) < 60) {
                isColliding = true;
            }
        });
    }

    balloon.style.left = balloonLeftPosition + 'px';
    document.getElementById('game-container').appendChild(balloon);
    activeBalloons.push({ element: balloon, text: randomWord, y: 0 });
}

function moveBalloons() {
    if (paused) return;
    activeBalloons.forEach((balloon, index) => {
        balloon.y += balloonSpeed;
        balloon.element.style.top = balloon.y + 'px';
        if (balloon.y > 550) {
            balloon.element.remove();
            activeBalloons.splice(index, 1);
            lives--;
            document.getElementById('lives').textContent = lives;
            if (lives === 0) alert('ゲームオーバー！');
        }
    });
}

// Adjust spawn rate dynamically
setInterval(() => {
    if (!paused) createBalloon();
}, balloonSpawnInterval);

setInterval(() => {
    if (!paused) moveBalloons();
}, 50);

document.addEventListener('keydown', (event) => {
    if (lives <= 0 || paused) return;

    let typedChar = event.key.toLowerCase();

    activeBalloons.forEach((balloon, index) => {
        if (romajiMap[balloon.text]) {
            let possibleRomaji = romajiMap[balloon.text];

            if (balloon.typed === undefined) {
                balloon.typed = ''; // Initialize tracking of typed input for this balloon
            }

            balloon.typed += typedChar;

            let isCorrect = possibleRomaji.some(correctRomaji => correctRomaji.startsWith(balloon.typed));

            if (isCorrect) {
                let isComplete = possibleRomaji.includes(balloon.typed);
                if (isComplete) {
                    balloon.element.style.backgroundColor = 'lightgreen';
                    setTimeout(() => {
                        balloon.element.remove();
                        activeBalloons.splice(index, 1);
                    }, 200);

                    score++;
                    document.getElementById('score').textContent = score;
                }
            } else {
                balloon.typed = ''; // Reset input if incorrect
            }
        }
    });
});

function togglePause() {
    paused = !paused;
    document.getElementById('stop-button').textContent = paused ? '再開' : '一時停止';
}

function restartGame() {
    document.getElementById('game-container').innerHTML = '';
    score = 0;
    lives = 3;
    activeBalloons = [];
    currentInput = '';
    paused = false; // Reset pause state
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('stop-button').textContent = '一時停止'; // Reset button text
    startTimer(); // Restart the timer
}

window.onload = () => {
    startTimer();
};
