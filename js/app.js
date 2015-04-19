//Frogger game.
//set default starting position for the player
defaultXPos = 202;
defaultYPos = 404;

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    //Choose 'random' starting postion for the enemy
    this.x = Math.random() * 505;
    this.y = 63 + (Math.round(Math.random() * 2) * 83);
    //Choose 'random' speed for the enemy
    this.velocity = (Math.random() * 150) + 75;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;
    if( this.x >= 505) {
        this.y = 63 + (Math.round(Math.random() * 2) * 83);
        this.x = -101;
    }
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var player = function() {
    //create player and set some methods
    this.sprite = 'images/char-boy.png';
    this.x = defaultXPos;
    this.y = defaultYPos;
    //initiate score
    this.score = 0;
    console.log('Your score: ' + this.score);
}

player.prototype.render = function() {
    //console.log('x: ' + this.x);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log('this.x: ' + this.x);
    //console.log('this.y: ' + this.y);
    if (this.y == -11) {
        //made it to the water! Add 10 points!
        this.score = this.score + 10;
        console.log('Your score: ' + this.score);
        //Return to start
        this.x = defaultXPos;
        this.y = defaultYPos;
     }
}

player.prototype.update = function(dt) {
    for(var thebug in allEnemies) {
        if(this.x < allEnemies[thebug].x + 90 && this.x + 65 > allEnemies[thebug].x + 2
          && this.y + 135 > allEnemies[thebug].y + 142 && this.y + 65 < allEnemies[thebug].y + 79) {
            //Collision! Deduct 10 points!
            this.score = this.score - 10;
            console.log('Your score: ' + this.score);
            //Send back to start
            this.x = defaultXPos;
            this.y = defaultYPos;
        }
    }
}

player.prototype.handleInput = function(key) {
    //change y value by an amount (83) that will
    //move the player UP by one block only IF doing
    // so will not result in being above the TOP of the screen
    if (key == 'up' && this.y -83 >=-11) {
        this.y = this.y-83;
    }

    //change y value by an amount (83) that will
    //move the player DOWN by one block only IF doing
    // so will not result in being above the BOTTOM of the screen
    if (key == 'down' && this.y +83 <487) {
        this.y = this.y+83;
    }

    //change x value by an amount (101) that will
    //move the player LEFT by one block only IF doing
    // so will not result in being to the left of the screen
    if (key == 'left' && this.x -101 >=0) {
        this.x = this.x-101;
        }
    //change x value by an amount (101) that will
    //move the player RIGHT by one block only IF doing
    // so will not result in being to the Right of the screen
    if (key == 'right' && this.x +101 < 505) {
        this.x = this.x+101;
        }
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

for (var index = 0; index < 4; index++) {
  //instantiate a new Enemy
  var enemyObj = new Enemy();
  //Add Enemy to array
  allEnemies.push(enemyObj);
}

// Place the player object in a variable called player
var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
