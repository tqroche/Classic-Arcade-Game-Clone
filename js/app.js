(function(){


// Enemies our player must avoid
let Enemy = function Enemy(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
      this.x = -100;
      let someSpeed = Math.floor(Math.random() * 4 + 1);
      this.speed = 60 * someSpeed;
    }

    let enemyXLeftMax = this.x - 70;
    let enemyXRightMax = this.x + 70;
    let enemyYTopMax = this.y - 60;
    let enemyYBottomMax = this.y + 60;
    if (player.x > enemyXleftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax) {

    player.resetPosition();
    lives--;
    updateView('you died. ' + lives + ' live(s) remaining...');
    if (lives === 0) {
      alert('game over...');
      player.resetPosition();
      is_game_over = true;
      updateView('you died. ' + lives + 'live(s) remaining...');
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function() {
  this.sprite = "images/char-boy.png";
  this.x = 303;
  this.y = 404;
  this.h_step = 101;
  this.v_step = 83;
};

Player.prototype.resetPosition = function() {
  this.x = 303;
  this.y = 404;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'left':
    this.x >= this.h_step ? this.x -= this.h_step : this.x -= 0;
      break;
    case 'right':
      this.x <= (this.h_step * 5) ? this.x += this.h_step : this.x +=0;
      break;
    case 'up':
      this.y -= this.v_step;
      if(this.y <= 50) {
        score += 10;
        crossed++;
        updateView('you win! score: ' + score);
        window.gem = new Gem();
        if(crossed % 5 ===0) {window.heart = new Heart(); }
        this.resetPosition();
      }
      break;
    case 'down':
        this.y <= (this.v_step * 4) ? this.y += this.v_step : this.y += 0;
        break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const players = [
  'images/char-boy.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png',
  'images/char-boy.png'
];

const Selector = function Selector() {
    this.image = 'images/Selector.png';

    this.x = 606;
    this.y = 375;
  }
  Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
  };
  Selector.prototype.stepped_on = function() {
    var leftMax = this.x - 40;
    var rightMax = this.x + 40;
    var topMax = this.y - 40;
    var bottomMax = this.y + 40;

    if(player.x > leftMax && player.x < rightMax && player.y > topMax && player.y < bottomMax) {
      player.sprite = players[ Math.floor(Math.random() * players.length) ];
      updateView('character changed!');
      player.resetPosition();
    }
  }


  // Place the player object in a variable called player
  window.player = new Player();
  window.selector = new Selector();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

  if (allowedKeys[e.keyCode]){
    player.handleInput(allowedKeys[e.keyCode]);
  }
});


})()
