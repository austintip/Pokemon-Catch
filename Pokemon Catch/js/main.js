
document.addEventListener('DOMContentLoaded', (e => {
}));

let gameTheme = document.createElement('audio')
gameTheme.src = './sounds/Gametheme.mp3'
gameTheme.volume = .5

let catchSound = document.createElement('audio')
catchSound.src = './sounds/catchSound.mp3'
catchSound.volume = .5

let battleSound = document.createElement('audio')
battleSound.src = './sounds/battleSound.mp3'
battleSound.volume = .5

let throwBallSound = document.createElement('audio')
throwBallSound.src = './sounds/pokeballThrow.mp3'
throwBallSound.volume = .5

let game = document.getElementById('game');
// Have a box that displays instructions
//Have a button in the box that says start
let startButton = document.getElementById('startButton');
let gameOverBox = document.getElementById('gameOver');
let youWinBox = document.getElementById('youWin');
let eeveeWinBox = document.getElementById('eeveeWin');
let replayBtn = document.querySelectorAll('.replayButton');
let pokemonVert = 1

let ctx = game.getContext('2d');
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

//create the sprites
function sprite(x, y, width, height, color, speed, alive, type)  {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color
    }
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.alive = alive;
    this.render = function() {
    if(type == "image") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}


let trainer = new sprite (20, 390, 50, 50, "./images/pokemonTrainer.png", 10, true, "image")
let rocketGrunt = new sprite (15, 200, 55, 55, "./images/rocketGruntImage.png", 6.7, true, "image")
let pokemon = new sprite (10, 0, 45, 45, "./images/pikachuImage.png", 11, true, "image")
let pokemonTwo = new sprite (100, 60, 45, 45, "./images/eeveeImage.png", 7, true, "image")
let pokeball = new sprite(20, 385, 20, 20, "./images/pokeballImage.png", 10, true, "image")



//moves rocket grunt
function rocketMovement() {
    if (rocketGrunt.x + rocketGrunt.width >= game.width) {
        rocketGrunt.speed = -rocketGrunt.speed
    } 
    if (rocketGrunt.x <= 0) {
        rocketGrunt.speed = -rocketGrunt.speed
    }
    rocketGrunt.x += rocketGrunt.speed
}

// moves pokemon
function pokemonMovement() {
    if (pokemon.x >= game.width) {
        pokemon.x = 0-pokemon.width
    }
    pokemon.x += pokemon.speed
    if (pokemon.y == 20) {
        pokemonVert = -1
    } 
    if (pokemon.y == 0) {
        pokemonVert = 1
    }
// if y > 20, y decreases 
// if y < 1, y increases
    pokemon.y += pokemonVert

}

function pokemonTwoMovement() {
    if (pokemonTwo.x >= game.width) {
        pokemonTwo.x = 0-pokemonTwo.width
    }
    pokemonTwo.x += pokemonTwo.speed
    if (pokemonTwo.y == 75) {
        pokemonVert = -1
    }
    if (pokemonTwo.y == 60) {
        pokemonVert = 1
    }
    pokemonTwo.y += pokemonVert
}

//the game!!
let gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    trainer.render()
    rocketGrunt.render()
    if (rocketGrunt.alive == false) {
        battleSound.play();
    }
    rocketMovement();
    pokemonMovement();
    pokemonTwoMovement();
    pokeball.render(); 
    gameTheme.play();
    detectHit();
    if (pokemon.alive == true){
        pokemon.render();
    }
    if (pokemonTwo.alive == true){
        pokemonTwo.render();
    }
    if (pokemon.alive == false || pokemonTwo.alive == false){
        catchSound.play();
        gameTheme.pause();
    }
    if (pokeball.alive == false) {
        throwPokeball();
        throwBallSound.play();
    }
}



let gameInterval 

//what happens when you hit either a pokemon or a rocket grunt
let endGame = () => {
    setTimeout(() => {
        clearInterval(gameInterval)
    }, 100)
    gameOverBox.style.display = "block";
    gameTheme.pause();
}

let endGameWin = () => {
    setTimeout(() => {
        clearInterval(gameInterval)
    }, 100)
    youWinBox.style.display = "block";
    gameTheme.pause();
}

let endGameEeveeWin = () => {
    setTimeout(() => {
        clearInterval(gameInterval)
    }, 100)
    eeveeWinBox.style.display = "block";
    gameTheme.pause();
}

//functions that detect hits of the pokeball
let detectHit = () => {
    if (
        pokeball.x + pokeball.width >= rocketGrunt.x &&
        pokeball.x <= rocketGrunt.x + rocketGrunt.width &&
        pokeball.y <= rocketGrunt.y + rocketGrunt.height &&
        pokeball.y + pokeball.height >= rocketGrunt.y) {
            rocketGrunt.alive = false;
            endGame();
    } 
    if(
        pokeball.x + pokeball.width >= pokemon.x &&
        pokeball.x <= pokemon.x + pokemon.width &&
        pokeball.y <= pokemon.y + pokemon.height &&
        pokeball.y + pokeball.height >= pokemon.y) {
            pokemon.alive = false;
            pokeball.y = trainer.y
            pokeball.alive = true;
            endGameWin();
            //TODO function that makes pokemon disappear and respawn
    } else if(
            pokeball.x + pokeball.width >= pokemonTwo.x &&
            pokeball.x <= pokemonTwo.x + pokemonTwo.width &&
            pokeball.y <= pokemonTwo.y + pokemonTwo.height &&
            pokeball.y + pokeball.height >= pokemonTwo.y) {
                pokemonTwo.alive = false;
                pokeball.y = trainer.y
                pokeball.alive= true;
                endGameEeveeWin();
            }
    }


// throws the ball
const throwPokeball = () => {
    if (pokeball.y < 0) {
        pokeball.alive = true
        pokeball.y = trainer.y
    }
    pokeball.y -= pokeball.speed
}

//moves trainer
let movementHandler = (e) => {
    if (e.key ==="ArrowRight") {
        trainer.x += trainer.speed
        if (pokeball.alive) {
            pokeball.x = trainer.x
        }
    } else if (e.key === "ArrowLeft") {
        trainer.x -= trainer.speed
        if (pokeball.alive) {
            pokeball.x = trainer.x
        }
    } else if (e.key ==='w') {
            // pokeball.x = trainer.x
            pokeball.alive = false
    } else {
        console.log('Use right or left arrow keys to move!')
    }
}


//game won't start until "Start" is clicked
startButton.addEventListener('click', (e) => {
    e.preventDefault()
    gameInterval = setInterval(gameLoop, 60);
});

//resets the page
function reload() {
    window.location.reload();
}

// function replay() {
//     youWinBox.style.display = "none";
//     gameOverBox.style.display = "none";
//     gameInterval.setInterval(gameLoop, 60);
//     pokemon.alive = true;
// };


// event listener for play again btn and keep catching btn
replayBtn.forEach(button => {
    button.addEventListener('click', reload);
});


// replayBtn.forEach(button => {
//     button.addEventListener('click', (event) =>
//     event.preventDefault);
//     replay();
// });


//event listener for game controls
document.addEventListener('keydown', movementHandler);