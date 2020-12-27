console.log("hello")
document.addEventListener('DOMContentLoaded', (e => {
    console.log("hello!")
}));

// Have a box that displays instructions
//Have a button in the box that says start
//After click "start" the box disappears

let game = document.getElementById('game');
let startButton = document.getElementById('startButton');

let ctx = game.getContext('2d');
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

function sprite(x, y, width, height, color, speed, alive)  {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.speed = speed
    this.alive = alive
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}


let trainer = new sprite (20, 380, 50, 50, 'red', 10, true)
let rocketGrunt = new sprite (15, 160, 55, 55, 'gray', 5, true)
let pokemon = new sprite (10, 40, 45, 45, 'yellow', 7, true)
let pokeball = new sprite(10, 375, 20, 20, 'white', 10, false)

//rocket animation
function rocketMovement() {
    if (rocketGrunt.x + rocketGrunt.width >= game.width) {
        rocketGrunt.speed = -rocketGrunt.speed
        // if (rocketGrunt.x = 100) {
        //     break;
        // }
    } 
    if (rocketGrunt.x <= 0) {
        rocketGrunt.speed = -rocketGrunt.speed
    }
    rocketGrunt.x += rocketGrunt.speed
}

function pokemonMovement() {
    if (pokemon.x >= game.width) {
        pokemon.x = 0-pokemon.width
    }
    pokemon.x += pokemon.speed
}

let gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    trainer.render()
    rocketGrunt.render()
    // have team rocket grunt that moves left to right while game is played
    pokemon.render()
    rocketMovement();
    pokemonMovement();
    // if (pokeball.alive === true) {
    pokeball.render();
    // }
    detectHit();
}



let gameInterval 

let endGame = () => {
    // TODO: write endGame funct
    console.log('hi')
    setTimeout(() => {
        clearInterval(gameInterval)
    }, 100)
}

let detectHit = () => {
    console.log('yo')
    if (
        pokeball.x + pokemon.width >= rocketGrunt.x &&
        pokeball.x <= rocketGrunt.x + rocketGrunt.width &&
        pokeball.y <= rocketGrunt.y + rocketGrunt.height &&
        pokeball.y + pokeball.height >= rocketGrunt.y
    ) {
        endGame();
    }
    // TODO: write collision detection
     //include endGame in here.
    }


//have a trainer (box for now) that moves with arrow keys
let movementHandler = (e) => {
    console.log(e.key)
    if (e.key ==="ArrowRight") {
        trainer.x += trainer.speed
    } else if (e.key === "ArrowLeft") {
        trainer.x -= trainer.speed
    } else if (e.key ==='w') {
            // pokeball.alive === true
            pokeball.y -= pokeball.speed
            pokeball.x = trainer.x
    } else {
        console.log('Use right or left arrow keys to move!')
    }
}
//have trainer throw a ball with spacebar


//game won't start until "Start" is clicked
startButton.addEventListener('click', (e) => {
    e.preventDefault()
    gameInterval = setInterval(gameLoop, 60);
});
document.addEventListener('keydown', movementHandler);
// document.addEventListener('keydown', pokeballThrow);






// have pokemon that spawns from off screen and moves across
// have a feature that detects a catch
//detect catch makes pokemon disappear into ball
// have a feature that detects a collision with rocket
//end game on rocket collision
// display "game over" in new window with "Play again" btn