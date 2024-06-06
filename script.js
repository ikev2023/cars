let player6;
const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
startScreen.addEventListener('click', start);
let player = { speed: 5, score: 0 };
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function isCollide(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function moveLines() {
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function (item) {
        if (item.y >= 650) {
            item.y -= 740;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');

    // Check and update high score
    updateHighScore();

    startScreen.innerHTML = "Fin del juego <br> Puntuación final:" + player.score +
        "<br>Puntuación más alta:" + getHighScore() +
        "<br>Pulsa de nuevo para volver a empezar";
    player6.pauseVideo();
    document.getElementById("score2").innerText = getHighScore();
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (item) {
        if (isCollide(car, item)) {
            endGame();
        }
        if (item.y >= 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}

function adjustSpeed() {
    if (player.score % 1000 === 0 && player.score !== 0) {
        player.speed += 1;
    }
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if (player.start) {
        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 85)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed;
        }
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        adjustSpeed();

        window.requestAnimationFrame(gamePlay);
        player.score++;
        score.innerText = "Score: " + player.score;
    }
}

function start() {
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    player.speed = 5;
    window.requestAnimationFrame(gamePlay);

    for (x = 0; x < 5; x++) {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + "px";
        gameArea.appendChild(roadLine);
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (x = 0; x < 3; x++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random() * 256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#" + c() + c() + c();
}

function getHighScore() {
    return localStorage.getItem('highScore') || 0;
}

function updateHighScore() {
    const highScore = getHighScore();
    if (player.score > highScore) {
        localStorage.setItem('highScore', player.score);
    }
}

function onYouTubeIframeAPIReady() {
    player6 = new YT.Player('player6', {
        height: '0',
        width: '0',
        videoId: 'pls6OyJpCWg',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange6
        }
    });
}

function playmusicquiz() {
    player6.playVideo();
}

function onPlayerStateChange6(event) {
    if (event.data == YT.PlayerState.ENDED) {
        player6.playVideo();  // Reiniciar la reproducción cuando termine
    }
}

function onPlayerReady(event) { }
