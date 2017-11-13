var YellowSidd = YellowSidd || {};

YellowSidd.Player = function (game_state, name, position, properties) {
  "use strict";

  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  // Player properties.
  this.walking_speed = +properties.walking_speed;
  this.jumping_speed = +properties.jumping_speed;
  this.bouncing = +properties.bouncing;
  this.score = +localStorage.player_score || 0; // Check if there's already a previous score.
  this.lives = +localStorage.player_lives || +properties.lives; // Check if there are already a previous lives.
  this.attack_rate = +properties.attack_rate;
  this.attack_speed = +properties.attack_speed;
  this.shooting = false;

  this.game_state.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  this.direction = "RIGHT";

  this.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7], 8, true); // Player walking animation.

  this.frame = 3;

  this.anchor.setTo(0.5);

  this.cursors = this.game_state.game.input.keyboard.createCursorKeys(); // Enable cursors.

  // Create shoot timer.
  this.shoot_timer = this.game_state.game.time.create();
  this.shoot_timer.loop(Phaser.Timer.SECOND / this.attack_rate, this.shoot, this);
};

YellowSidd.Player.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Player.prototype.constructor = YellowSidd.Player;

YellowSidd.Player.prototype.update = function () {
  "use strict";
  // Check player collision.
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision); // Layers collisions.
  this.game_state.game.physics.arcade.collide(this, this.game_state.groups.enemies, this.hit_enemy, null, this); // Enemies collisions.

  // The player automatically dies if in contact with invincible enemies or enemy fireballs.
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.invincible_enemies, this.die, null, this);
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.enemy_fireballs, this.die, null, this);

  if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
    // Move right.
    this.body.velocity.x = this.walking_speed;
    this.direction = "RIGHT";
    this.animations.play('walking');
    this.scale.setTo(1, 1);
  } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
    // Move left
    this.body.velocity.x = -this.walking_speed;
    this.direction = "LEFT";
    this.animations.play('walking');
    this.scale.setTo(-1, 1);
  } else {
    // Stop.
    this.body.velocity.x = 0;
    this.animations.stop();
    this.frame = 3;
  }

  // Jump only if touching a tile.
  if (this.cursors.up.isDown && this.body.blocked.down) {
    this.body.velocity.y = -this.jumping_speed;
  }

  // Dies if touches the end of the screen.
  if (this.bottom >= this.game_state.game.world.height) {
    this.die();
  }

  // If the player is able to shoot and the shooting button is pressed then start shooting.
  if (this.shooting && this.game_state.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    if (!this.shoot_timer.running) {
      // Start a timer which will call the shoot method in a loop.
      this.shoot();
      this.shoot_timer.start();
    }
  } else {
    this.shoot_timer.stop(false);
  }
};

YellowSidd.Player.prototype.hit_enemy = function (player, enemy) {
  "use strict";
  // If the player is above the enemy, the enemy is killed, otherwise the player dies.
  if (enemy.body.touching.up) {
    this.score += enemy.score; // Add points to score.
    enemy.kill();
    player.y -= this.bouncing;
  } else {
    this.die(); // Restart level.
  }
};

YellowSidd.Player.prototype.die = function () {
  "use strict";
  this.lives -= 1;
  this.shooting = false;

  if (this.lives > 0) {
    this.game_state.restart_level(); // Player lost 1 life, but still have more then 0, so restart level eventually checkpoint.
  } else {
    this.game_state.game_over(); // Player lost all lives then game over.
  }
};

YellowSidd.Player.prototype.shoot = function () {
  "use strict";
  var fireball, fireball_position, fireball_properties, name;
  name = 'fireball';

  // Get the first dead fireball from the pool.
  fireball = this.game_state.groups.fireballs.getFirstDead();
  fireball_position = new Phaser.Point(this.x, this.y);

  if (!fireball) {
    // If there is no dead fireball then create a new one.
    fireball_properties = {'texture': 'fireball_image', 'group': 'fireballs', 'direction': this.direction, 'speed': this.attack_speed};
    fireball = new YellowSidd.Fireball(this.game_state, name, fireball_position, fireball_properties);
  } else {
    // If there is a dead fireball then reset it in the new position.
    fireball.reset(fireball_position.x, fireball_position.y);
    fireball.body.velocity.x = (this.direction === "LEFT") ? -this.attack_speed : this.attack_speed;
  }
};