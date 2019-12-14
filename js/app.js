// Enemies our player must avoid
let Enemy = function (x, y, speed) {

  // letiables applied to each of our instances go here,
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
        player.x = 200;
        player.y = 400;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (x, y) {
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
      this.x -= 100;
  };

  if (keyPress == 'right' && this.x < 400) {
      this.x += 100;
  };

  if (keyPress == 'up' && this.y > 0) {
      this.y -= 100;
  };

  if (keyPress == 'down' && this.y < 400) {
      this.y += 100;
  };

  if (this.y < 0) {
      this.x = 200;
      this.y = 400;
      setTimeout(function() {
        alert('you won');
      }, 500);
    }
  };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a letiable called player
let allEnemies = [];

let enemyOrientation = [156, 64, 210];
let player = new Player(200, 400);


enemyOrientation.forEach(function (orientationY) {
    enemy = new Enemy(0, orientationY, 50 + Math.floor(Math.random() * 350));
    allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
