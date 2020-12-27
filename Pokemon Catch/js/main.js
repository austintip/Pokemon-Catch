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

function sprite(x, y, width, height, color, speed)  {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.speed = speed
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}


let trainer = new sprite (20, 380, 50, 50, 'red')
let rocketGrunt = new sprite (15, 160, 55, 55, 'gray', 5)
let pokemon = new sprite (10, 40, 45, 45, 'yellow', 7)
let pokeball = new sprite(trainer.x, trainer.y, 20, 20, 'white')
let movement = 5

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
    pokeball.render();
}

let gameInterval 

let detectHit = () => {
    console.log('yo')
    // TODO: write collision detection
    //include endGame in here.
}

let endGame = () => {
    // TODO: write endGame funct
    console.log('hi')
}

//have a trainer (box for now) that moves with arrow keys
let movementHandler = (e) => {
    if (e.key ==="ArrowRight") {
        trainer.x += movement
    } else if (e.key === "ArrowLeft") {
        trainer.x -= movement
    } else {
        console.log('Use right or left arrow keys to move!')
    }
}
//have trainer throw a ball with spacebar

let pokeballThrow = (event) => {
    if (event.code ==='Space') {
        pokeball.y -= movement + 10
    }
}
//game won't start until "Start" is clicked
startButton.addEventListener('click', (e) => {
    e.preventDefault()
    gameInterval = setInterval(gameLoop, 60);
});
document.addEventListener('keydown', movementHandler);
document.addEventListener('keydown', pokeballThrow);






// have pokemon that spawns from off screen and moves across
// have a feature that detects a catch
//detect catch makes pokemon disappear into ball
// have a feature that detects a collision with rocket
//end game on rocket collision
// display "game over" in new window with "Play again" btn