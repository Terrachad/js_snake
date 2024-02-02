addEventListener("DOMContentLoaded", (event) => {
    const gamewindow = document.querySelector(".game-window");
    const scorecount = document.querySelector(".score-count");
    const body = document.querySelector("body");
    const gameOverModal = document.getElementById("game-over-modal");
    const finalScoreElement = document.getElementById("final-score");
    const resetButton = document.getElementById("reset-button");

    let score = 0;
    let foodXinit = Math.floor(Math.random() * 30) + 1;
    let foodYinit = Math.floor(Math.random() * 30) + 1;
    let foodY = foodYinit;
    let foodX = foodXinit;

    let snakeXinit = Math.floor(Math.random() * 30) + 1;
    let snakeYinit = Math.floor(Math.random() * 30) + 1;
    let snakeX = snakeXinit
    let snakeY = snakeYinit


    let snaketail = [];
    let snakelength = 0;

    let direction = '';
    let gameover = false;


    function showGameOverModal() {
        finalScoreElement.textContent = score;
        gameOverModal.style.display = "block";
    }

    function resetGame() {
        // Reset game variables and hide the modal
        gameOverModal.style.display = "none";
        score = 0;
        snakelength = 0;
        snakeXinit = Math.floor(Math.random() * 30) + 1;
        snakeYinit = Math.floor(Math.random() * 30) + 1;
        snakeX = snakeXinit;
        snakeY = snakeYinit;
        snaketail = [];
        direction = '';
        gameover = false;
        moveSnake(snakeYinit, snakeXinit);
    }

    resetButton.addEventListener("click", resetGame);

    const moveFood = (Y, X) => {
        const food = `<div class="food" style="grid-area: ${Y} / ${X}"></div>`
        return food;
    }
    gamewindow.innerHTML += moveFood(foodYinit, foodXinit);

    const moveSnake = (Y, X) => {
        const snake = `<div class="snake" style="grid-area: ${Y} / ${X}"></div>`
        gamewindow.innerHTML = snake;

        for (i = 0; i < snakelength; i++) {
            gamewindow.innerHTML += `<div class="snake" style="grid-area: ${snaketail[i][0]} / ${snaketail[i][1]}"></div>`;
        }



        if (foodX === X && foodY === Y) {
            score++;
            snakelength++;
            foodY = Math.floor(Math.random() * 30) + 1;
            foodX = Math.floor(Math.random() * 30) + 1;
            for (i = 0; i < snakelength; i++) {
                if (snaketail[i][0] == foodY && snaketail[i][1] == foodX) {
                    foodY = Math.floor(Math.random() * 30) + 1;
                    foodX = Math.floor(Math.random() * 30) + 1;
                    i = 0;
                }

            }


        }


        gamewindow.innerHTML += moveFood(foodY, foodX);
    }

    const checkCollisionWithTail = (headY, headX) => {
        for (let i = 0; i < snakelength; i++) {
            if (snaketail[i][0] === headY && snaketail[i][1] === headX) {
                return true;
            }
        }
        return false;
    };


    moveSnake(snakeYinit, snakeXinit);

    let prevDir = '';

    setInterval(function() {

        if (checkCollisionWithTail(snakeY, snakeX) == true) {
            gameover = true;
            showGameOverModal();
        }
        if (!gameover) {
            // Existing code for moving the snake and updating the game
            scorecount.innerHTML = score;


            if (snaketail.length > snakelength)
                snaketail.shift();

            snaketail.push([snakeY, snakeX]);

            moveSnake(snakeY, snakeX);
            if (direction === "up") {
                snakeY--;
            } else if (direction === "down") {
                snakeY++;
            } else if (direction === "left") {
                snakeX--;
            } else if (direction === "right") {
                snakeX++;
            }

            // Wrap the snake around the game window if it goes out of bounds
            if (snakeY > 30) snakeY = 1;
            if (snakeY === 0) snakeY = 30;
            if (snakeX > 30) snakeX = 1;
            if (snakeX === 0) snakeX = 30;

            for (i = 0; i < snakelength; i++) {


                gamewindow.innerHTML += `<div class="snake" style="grid-area: ${snaketail[i][0]} / ${snaketail[i][1]}"></div>`

            }
        }

    }, 120);
    document.addEventListener("keypress", function(event) {

        if (event.code === "KeyW" && direction != "down")
            direction = "up"
        if (event.code == "KeyA" && direction != "right")
            direction = "left"
        if (event.code == "KeyS" && direction != "up")
            direction = "down"
        if (event.code == "KeyD" && direction != "left")
            direction = "right"

    })


});