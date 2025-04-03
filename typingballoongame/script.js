const words = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 
                'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 
                'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
                'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 
                'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
const romajiMap = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n'
};
let score = 0;
let lives = 3;
let activeBalloons = [];
let currentInput = '';
let paused = false;

// function createBalloon() {
//     if (lives <= 0 || paused) return;
//     let balloon = document.createElement('div');
//     balloon.classList.add('balloon');
//     let randomWord = words[Math.floor(Math.random() * words.length)];
//     balloon.textContent = randomWord;
//     balloon.style.left = Math.random() * 360 + 'px';
//     document.getElementById('game-container').appendChild(balloon);
//     activeBalloons.push({ element: balloon, text: randomWord, y: 0 });
// }

function createBalloon() {
    if (lives <= 0 || paused) return;

    let balloon = document.createElement('div');
    balloon.classList.add('balloon');
    let randomWord = words[Math.floor(Math.random() * words.length)];
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
        balloon.y += 2;
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

setInterval(() => {
    if (!paused) createBalloon();
}, 2000);

setInterval(() => {
    if (!paused) moveBalloons();
}, 50);

document.addEventListener('keydown', (event) => {
    if (lives <= 0 || paused) return;

    let typedChar = event.key.toLowerCase();

    activeBalloons.forEach((balloon, index) => {
        if (romajiMap[balloon.text]) {
            let correctRomaji = romajiMap[balloon.text];

            if (balloon.typed === undefined) {
                balloon.typed = ''; // Initialize tracking of typed input for this balloon
            }

            balloon.typed += typedChar;

            if (correctRomaji.startsWith(balloon.typed)) {
                // If the current input matches the start of the romaji, continue
                if (balloon.typed === correctRomaji) {
                    // Full romaji sequence typed correctly, give visual feedback
                    balloon.element.style.backgroundColor = 'lightgreen'; // Change color to green
                    setTimeout(() => {
                        balloon.element.remove();
                        activeBalloons.splice(index, 1);
                    }, 200); // Short delay before removing balloon

                    score++;
                    document.getElementById('score').textContent = score;
                }
            } else {
                // Reset the input if it's incorrect
                balloon.typed = '';
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
}