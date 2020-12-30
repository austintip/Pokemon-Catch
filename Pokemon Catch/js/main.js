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
let pokeball = new sprite(10, 375, 20, 20, 'white', 10, true)

//moves rocket grunt
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

// moves pokemon
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
    rocketMovement();
    pokemonMovement();
    pokeball.render(); 
    detectHit();
    if (pokemon.alive == true){
    pokemon.render();
    }
    if (pokeball.alive == false) {
        throwPokeball();
    }
}



let gameInterval 

let endGame = () => {
    setTimeout(() => {
        clearInterval(gameInterval)
    }, 100)
}

let detectHit = () => {
    console.log('yo')
    if (
        pokeball.x + pokeball.width >= rocketGrunt.x &&
        pokeball.x <= rocketGrunt.x + rocketGrunt.width &&
        pokeball.y <= rocketGrunt.y + rocketGrunt.height &&
        pokeball.y + pokeball.height >= rocketGrunt.y) {
            endGame();
        } else if(
        pokeball.x + pokeball.width >= pokemon.x &&
        pokeball.x <= pokemon.x + pokemon.width &&
        pokeball.y <= pokemon.y +pokemon.height &&
        pokeball.y + pokeball.height >= pokemon.y) {
            pokemon.alive = false;
            pokeball.y = trainer.y
            pokeball.alive = true;
            //function that makes pokemon disappear and respawn
        }
    // pokemon.alive = true;
    }



const throwPokeball = () => {
    if (pokeball.y < 0) {
        pokeball.alive = true
        pokeball.y = trainer.y
    }
    pokeball.y -= pokeball.speed
}

//moves trainer
let movementHandler = (e) => {
    console.log(e.key)
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
            pokeball.x = trainer.x
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
document.addEventListener('keydown', movementHandler);


// display "game over" in new window with "Play again" btn