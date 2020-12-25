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

function Sprite(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let trainer = new Sprite (20, 380, 50, 50, 'red')
let rocketGrunt = new Sprite (15, 160, 55, 55, 'gray')
let pokemon = new Sprite (10, 40, 45, 45, 'yellow')
let movement = 15

let gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    trainer.render()
    rocketGrunt.render()
    pokemon.render()
    let gameInterval = setInterval(gameLoop, 100);
}

let detectHit = () => {
    console.log('yo')
    // TODO: write collision detection
    //include endGame in here.
}

let endGame = () => {
    // TODO: write endGame funct
    console.log('hi')
}

let movementHandler = (e) => {
    if (e.key ==="ArrowRight") {
        trainer.x += movement
    } else if (e.key === "ArrowLeft") {
        trainer.x -= movement
    } else {
        console.log('Use right or left arrow keys to move!')
    }
}

//game won't start until "Start" is clicked
startButton.addEventListener('click', gameLoop);
document.addEventListener('keydown', movementHandler)





//have a trainer (box for now) that moves with arrow keys
//have trainer throw a ball with spacebar
// have team rocket grunt that moves left to right while game is played
// have pokemon that spawns from off screen and moves across
// have a feature that detects a catch
//detect catch makes pokemon disappear into ball
// have a feature that detects a collision with rocket
//end game on rocket collision
// display "game over" in new window with "Play again" btn