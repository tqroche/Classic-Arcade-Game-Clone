// Enemies our player must avoid
var Enemy = function (x, y, speed) {

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers
  this.x += this.speed * dt;

    if (this.x > 625) {
        this.x = -75;
        this.speed = 100 + Math.floor(Math.random() * 350);
    };

    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 70 &&
        70 + player.y > this.y) {
        player.x = 202;
        player.y = 400;
        displayModal();
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-princess-girl.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  if (keyPress == 'left' && this.x > 0) {
      this.x -= 102;
  };

  if (keyPress == 'right' && this.x < 405) {
      this.x += 102;
  };

  if (keyPress == 'up' && this.y > 0) {
      this.y -= 83;
  };

  if (keyPress == 'down' && this.y < 405) {
      this.y += 83;
  };

  if (this.y < 0) {
      this.x = 202;
      this.y = 405;
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemyOrientation = [156, 64, 210];
var player = new Player(202, 405);


enemyOrientation.forEach(function (orientationY) {
    enemy = new Enemy(0, orientationY, 50 + Math.floor(Math.random() * 350));
    allEnemies.push(enemy);
});

// Shows the modal after game won
let modal = document.getElementById("modal");

function displayModal() {
  console.log("display modal triggered")
}

function hideModal() {
  modal.classList.add("hide");
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
