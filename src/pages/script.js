const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const levelElement = document.querySelector(".level");
const progressLevelElement = document.querySelector(".progress-level");
const gamesDetailsElement = document.querySelector(".game-details");

let gameOver = false;
let foodX , foodY;
let snakeX=1 , snakeY=1;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId
let score = 0;

let level = 1;
let blockScore = 20;
let pro_score = 0.5;
let intensity = 140

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerHTML = `High score  ${highScore}`
levelElement.innerHTML = `Level ${level}`
progressLevelElement.style.width = `${(pro_score/blockScore)*100}%`

const changeLevel = () => {

    if (score == level * blockScore) {
        level = level + 1;
        intensity = intensity - blockScore /*blockScore*/
        levelElement.innerHTML = `Level ${level}`
        pro_score = 0.5
        progressLevelElement.style.width = `${(pro_score/blockScore)*100}%`
        console.log("games",gamesDetailsElement.style)
        // setIntervalId = setInterval(initGame,intensity)

        
    }

    switch (level) {
        case 1:
          console.log('nivel 1');
          break;
        case 2:
            gamesDetailsElement.style.backgroundImage = "url('https://i.imgur.com/LlWTYTY.jpeg')"
            clearInterval(setIntervalId)
            setIntervalId = setInterval(initGame,intensity)
          break;
        case 3:
            gamesDetailsElement.style.backgroundImage = "url('https://i.imgur.com/vNcTXE4.jpeg')"
            clearInterval(setIntervalId)
            setIntervalId = setInterval(initGame,intensity)
            break;
        case 4:
            gamesDetailsElement.style.backgroundImage = "url('https://i.imgur.com/2lQtD64.jpeg')"
            clearInterval(setIntervalId)
            setIntervalId = setInterval(initGame,intensity)
            break;
        case 5:
            gamesDetailsElement.style.backgroundImage = "url('https://i.imgur.com/tzkNU5B.png')"
            clearInterval(setIntervalId)
            setIntervalId = setInterval(initGame,intensity)
            break;
        case 6:
            gamesDetailsElement.style.backgroundImage = "url('https://i.imgur.com/HyXa3WN.png')"
            clearInterval(setIntervalId)
            setIntervalId = setInterval(initGame,intensity)
            break;
        case 7:
            gamesDetailsElement.style.backgroundImage = "url('https://i.imgur.com/BvrP6na.png')"
            clearInterval(setIntervalId)
            setIntervalId = setInterval(initGame,intensity)
            break;
        default:
          console.log('algo pasa');
    }

}

const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    console.log(foodX);
}

const handleGameOver = () =>{
    clearInterval(setIntervalId)
    alert("Game Over")
    location.reload();
}

const changeDireccion = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if (e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if (e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if (e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    // initGame(); 
    console.log(e)
}
const initGame = () =>{

    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++
        pro_score++

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score ${score}`
        highScoreElement.innerHTML = `High score  ${highScore}`

        progressLevelElement.style.width = `${(pro_score/blockScore)*100}%`
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        console.log(snakeBody[i]);
        snakeBody[i] = snakeBody[i - 1];
        
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1]  === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true; 
        }
        
    }

    changeLevel()

    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
// initGame(); 
// if (level++) {
//     setIntervalId = setInterval(initGame,intensity)
// }
setIntervalId = setInterval(initGame,intensity)
document.addEventListener("keydown", changeDireccion);