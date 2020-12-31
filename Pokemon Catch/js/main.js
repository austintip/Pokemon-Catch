console.log("hello")
document.addEventListener('DOMContentLoaded', (e => {
    console.log("hello!")
}));


let game = document.getElementById('game');
// Have a box that displays instructions
//Have a button in the box that says start
let startButton = document.getElementById('startButton');
let gameOverBox = document.getElementById('gameOver');
let youWinBox = document.getElementById('youWin');
let replayBtn = document.querySelectorAll('.replayButton');

let ctx = game.getContext('2d');
game.setAttribute('height', getComputedStyle(game)['height'])
game.setAttribute('width', getComputedStyle(game)['width'])

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


let trainer = new sprite (20, 380, 50, 50, "data:image/png;base64,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", 10, true, "image")
let rocketGrunt = new sprite (15, 160, 55, 55, "https://ih1.redbubble.net/image.120771338.3071/st,small,507x507-pad,600x600,f8f8f8.u1.jpg", 5, true, "image")
let pokemon = new sprite (10, 40, 45, 45, "https://www.pngitem.com/pimgs/m/341-3410110_8-bit-pikachu-pixel-art-hd-png-download.png", 7, true, "image")
let pokeball = new sprite(20, 375, 20, 20, "https://www.pngkit.com/png/detail/314-3140523_pokeball-master-ball-sprite-png.png", 10, true, "image")



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
    gameOverBox.style.display = "block";
    // include a box that pops up saying game over, Play Again?
}

let endGameWin = () => {
    setTimeout(() => {
        clearInterval(gameInterval)
    }, 100)
    youWinBox.style.display = "block";
    //include a box saying "You caught a pokemon! <btn>Keep catching</btn>"
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
            endGameWin();
            //TODO function that makes pokemon disappear and respawn
        }
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

function reload() {
    window.location.reload();
}
// make event listener for play again btn and keep catching btn
replayBtn.forEach(button => {
    button.addEventListener('click', reload);
});


// replayBtn.addEventListener('click', reload);
document.addEventListener('keydown', movementHandler);



// display "game over" in new window with "Play again" btn