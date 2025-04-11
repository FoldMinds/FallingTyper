const basicWords = ['あ', 'い', 'う', 'え', 'お'];
const secondWords = ['か', 'き', 'く', 'け', 'こ', 
    'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 
    'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 
    'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
const advancedWords = ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
                       'だ', 'ぢ', 'づ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ',
                       'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'キャ', 'キュ', 'キョ',
                       'シャ', 'シュ', 'ショ', 'チャ', 'チュ', 'チョ',
                       'ニャ', 'ニュ', 'ニョ', 'ヒャ', 'ヒュ', 'ヒョ',
                       'ミャ', 'ミュ', 'ミョ', 'リャ', 'リュ', 'リョ'];
const todofukenWords = ['北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島', '茨城', '栃木', '群馬',
                        '埼玉', '千葉', '東京', '神奈川', '新潟', '富山', '石川', '福井', '山梨', '長野',
                        '岐阜', '静岡', '愛知', '三重', '滋賀', '京都', '大阪', '兵庫', '奈良', '和歌山',
                        '鳥取', '島根', '岡山', '広島', '山口', '徳島', '香川', '愛媛', '高知',
                        '福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿児島', '沖縄'];
let useTodofuken = false;
let completedWords = new Set();
let currentWordList = [...basicWords];
let wordStage = 'basic'; // 'basic', 'second', 'advanced', 'done'
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
const todofukenRomajiMap = {
    '北海道': ['hokkaidou',], '青森': ['aomori'], '岩手': ['iwate'], '宮城': ['miyagi'],
    '秋田': ['akita'], '山形': ['yamagata'], '福島': ['fukushima'], '茨城': ['ibaraki'],
    '栃木': ['tochigi'], '群馬': ['gunma','gunnma'], '埼玉': ['saitama'], '千葉': ['chiba','tiba'],
    '東京': ['toukyou'], '神奈川': ['kanagawa'], '新潟': ['niigata'], '富山': ['toyama'],
    '石川': ['ishikawa'], '福井': ['fukui'], '山梨': ['yamanashi','yamanasi'], '長野': ['nagano'],
    '岐阜': ['gifu'], '静岡': ['shizuoka'], '愛知': ['aichi','aiti'], '三重': ['mie'],
    '滋賀': ['shiga'], '京都': ['kyouto'], '大阪': ['oosaka'], '兵庫': ['hyougo'],
    '奈良': ['nara'], '和歌山': ['wakayama'], '鳥取': ['tottori'], '島根': ['shimane'],
    '岡山': ['okayama'], '広島': ['hiroshima'], '山口': ['yamaguchi'], '徳島': ['tokushima'],
    '香川': ['kagawa'], '愛媛': ['ehime'], '高知': ['kouchi','kouti'], '福岡': ['fukuoka'],
    '佐賀': ['saga'], '長崎': ['nagasaki'], '熊本': ['kumamoto'], '大分': ['ooita'],
    '宮崎': ['miyazaki'], '鹿児島': ['kagoshima'], '沖縄': ['okinawa']
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
    if (!paused) {
        elapsedTime = elapsedTime || 0;
    }
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
    document.getElementById('gameover-score').textContent = score;
    document.getElementById('gameover-time').textContent = elapsedTime;
    document.getElementById('gameover-popup').style.display = 'flex';
    paused = true;
    playgameoverSound();
}

function createBalloon() {
    if (lives <= 0 || paused) return;

    let balloon = document.createElement('div');
    balloon.classList.add('balloon');

    let randomWord;
    if (useTodofuken) {
        let availableWords = todofukenWords.filter(word => !completedWords.has(word));
        if (availableWords.length === 0) {
            showCompletionPopup();
            paused = true;
            return;
        }
        randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    } else {
        let availableWords = currentWordList.filter(word => !completedWords.has(word));
        if (availableWords.length === 0) {
            if (wordStage === 'basic') {
                currentWordList = [...secondWords];
                wordStage = 'second';
                completedWords.clear();
            } else if (wordStage === 'second') {
                currentWordList = [...advancedWords];
                wordStage = 'advanced';
                completedWords.clear();
            } else if (wordStage === 'advanced') {
                showCompletionPopup();
                wordStage = 'done';
                paused = true;
                return;
            }
            availableWords = currentWordList.filter(word => !completedWords.has(word));
        }
        randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    }

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
            activeBalloons.splice(index, 1);
            balloon.element.remove();
            lives--;
            document.getElementById('lives').textContent = lives;
            if (lives === 0) {
                endGame();
            }
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

    // playKeySound();

    let typedChar = event.key.toLowerCase();

    activeBalloons.forEach((balloon, index) => {
        let possibleRomaji = romajiMap[balloon.text] || todofukenRomajiMap[balloon.text];
        if (possibleRomaji) {

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
                    completedWords.add(balloon.text);
                    document.getElementById('score').textContent = score;
                    updateProgress();
                    playSliceSound();
                }
            } else {
                balloon.typed = ''; // Reset input if incorrect
            }
        }
    });
});

function startTodofukenGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    currentWordList = [...todofukenWords];
    wordStage = 'todofuken';
    completedWords.clear();
    restartGame();
    elapsedTime = 0;
    timerElement.textContent = elapsedTime;
    useTodofuken = true;
    playRandomBGM();
}

function startGameFromButton() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    restartGame();
    elapsedTime = 0; // Reset timer to zero
    timerElement.textContent = elapsedTime; // Display updated time
    playRandomBGM();
}

function restartGame() {
    document.getElementById('game-container').innerHTML = '';
    score = 0;
    lives = 3;
    activeBalloons = [];
    currentInput = '';
    paused = false; // Reset pause state
    elapsedTime = 0; // Reset timer to zero
    balloonSpeed = 2;
    balloonSpawnInterval = 2000;
    completedWords.clear();
    currentWordList = [...basicWords];
    wordStage = 'basic';
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    updateProgress(); // Reset progress
    startTimer(); // Restart the timer
    timerElement.textContent = elapsedTime; // Display updated time
}

function goToStartScreen() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
    score = 0;
    lives = 3;
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerElement.textContent = elapsedTime;
    activeBalloons.forEach(balloon => balloon.element.remove());
    activeBalloons = [];
}

function updateProgress() {
    let total = currentWordList.length;
    let completed = completedWords.size;
    let percent = (completed / total) * 100;
    document.getElementById('progress-bar').style.width = percent + '%';

    let levelText = '';
    if (wordStage === 'basic') {
        levelText = 'Level 1: あいうえお';
    } else if (wordStage === 'second') {
        levelText = 'Level 2';
    } else if (wordStage === 'advanced') {
        levelText = 'Level 3';
    } else if (wordStage === 'done' || wordStage === 'todofuken') {
        levelText = 'All Completed!';
    }

    document.getElementById('level-text').textContent = levelText;
}

function showCompletionPopup() {
    playWinSound();
    document.getElementById('completion-popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('completion-popup').style.display = 'none';
}

function closeGameOverPopup() {
    document.getElementById('gameover-popup').style.display = 'none';
}

window.onload = () => {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-button').addEventListener('click', startGameFromButton);
    document.getElementById('todofuken-button').addEventListener('click', startTodofukenGame);
};

/* Edu Version 0.2 */
