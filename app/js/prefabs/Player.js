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

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  // Create shoot timer.
  this.shoot_timer = this.game_state.game.time.create();
  this.shoot_timer.loop(Phaser.Timer.SECOND / this.attack_rate, this.shoot, this);

  // Add extra lives according to made extra heart purchases.
  if (localStorage.heart_plus_one_once === '1') {
    this.game_state.prefabs.player.lives += 1;
  }
  if (localStorage.heart_plus_one_infinite === '1') {
    this.game_state.prefabs.player.lives += 1;
  }

  // Add extra speed according to made extra speed purchases.
  if (localStorage.speed_plus_one_once === '1') {
    this.game_state.prefabs.player.walking_speed *= 1.5;
  }
  if (localStorage.speed_plus_one_infinite === '1') {
    this.game_state.prefabs.player.walking_speed *= 1.5;
  }

  // Add extra jump according to made jump heart purchases.
  if (localStorage.jump_plus_one_once === '1') {
    this.game_state.prefabs.player.jumping_speed *= 1.5;
  }
  if (localStorage.jump_plus_one_infinite === '1') {
    this.game_state.prefabs.player.jumping_speed *= 1.5;
  }

  // Add sounds.
  this.fireball_sound = this.game.add.audio('fireball');
  this.jump_sound = this.game.add.audio('jump');
  this.kill_enemy_sound = this.game.add.audio('kill_enemy');
  this.lost_heart_sound = this.game.add.audio('lost_heart');
  this.walking_sound = this.game.add.audio('walking', .2);

  // Load stick only at the beginning of the game.
  if (!GAME_START) {
    this.pad = this.game.plugins.add(Phaser.VirtualJoystick); // Initialize VirtualJoystick Plugin.
    this.stick = this.pad.addStick(80, 280, 45, 'generic'); // Add stick for Virtual Joystick.

    this.buttonFireball = this.pad.addButton(620, 280, 'generic', 'button1-up', 'button1-down'); // Add buttons for VirtualStick.

    GAME_START = true; // Variable to toggle pad/stick displaying.
  }
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

  if (this.stick.isDown) {
    if (this.stick.forceX >= 0) {
      // Move right.
      this.body.velocity.x = this.walking_speed;
      this.direction = "RIGHT";
      this.scale.setTo(1, 1);
    } else if (this.stick.forceX < 0) {
      // Move left.
      this.body.velocity.x = -this.walking_speed;
      this.direction = "LEFT";
      this.scale.setTo(-1, 1);
    }

    this.animations.play('walking'); // Play walking animation.

    // Play sound only if player button sound is as "on" mode.
    if (PLAY_SOUND) {
      this.walking_sound.play(); // Play walking sound.
    }

    if (this.body.blocked.down) {
      this.body.velocity.y = this.stick.forceY * this.jumping_speed * 1.2; // Increase speed for mobile.

      // Play sound only if player left button sound as on mode.
      if (PLAY_SOUND && this.stick.angleFull > 210 && this.stick.angleFull < 330) {
        this.jump_sound.play(); // Play jump sound.
      }
    }
  } else {
    // Stop.
    this.body.velocity.x = 0;
    this.animations.stop();
    this.frame = 3;
  }

  // Dies if touches the end of the screen.
  if (this.bottom >= this.game_state.game.world.height) {
    this.die();
  }

  // If the player is able to shoot and the shooting button is pressed then start shooting.
  if (this.shooting && this.buttonFireball.isDown) {
    if (!this.shoot_timer.running) {
      // Start a timer which will call the shoot method in a loop.
      this.shoot();
      this.shoot_timer.start();

      // Play sound only if player left button sound as on mode.
      if (PLAY_SOUND) {
        this.fireball_sound.play(); // Play jump sound.
      }
    }
  } else {
    this.shoot_timer.stop(false);
  }

  // Avoid displaying pad/stick once goal will be reached.
  if (REACHED_NEXT_LEVEL) {
    // Check if checkpoint has been reached to display correctly pad/stick.
    if (!CHECKPOINT_REACHED) {
      // Avoid duplication of stick and button.
      this.stick.visible = 0;
      this.buttonFireball.visible = 0;

      // GAME_START = false; // Variable to toggle pad/stick displaying.
    }
    REACHED_NEXT_LEVEL = false; // Variable to toggle visibility of pad/stick on next level.
    GAME_START = false; // Variable to toggle pad/stick displaying.

    this.game_state.restart_level();
  }
};

YellowSidd.Player.prototype.hit_enemy = function (player, enemy) {
  "use strict";
  // If the player is above the enemy, the enemy is killed, otherwise the player dies.
  if (enemy.body.touching.up) {
    this.score += enemy.score; // Add points to score.
    enemy.kill(); // Kill enemy.
    player.y -= this.bouncing;

    // Play sound only if player left button sound as on mode.
    if (PLAY_SOUND) {
      this.kill_enemy_sound.play(); // Play kill enemy sound.
    }
  } else {
    this.die(); // Restart level.
  }
};

YellowSidd.Player.prototype.die = function () {
  "use strict";
  this.lives -= 1;
  this.shooting = false;
  this.lastScore = this.score; // Get last score.

  localStorage.setItem('lastScore', this.lastScore); // Set last score.


  // Play sound only if player left button sound as on mode.
  if (PLAY_SOUND) {
    this.lost_heart_sound.play(); // Play lost heart sound.
  }

  if (this.lives > 0) {
    // Check if checkpoint has been reached to display correctly pad/stick.
    if (!CHECKPOINT_REACHED) {
      // Avoid duplication of stick and button.
      this.stick.visible = 0;
      this.buttonFireball.visible = 0;
    }

    GAME_START = false; // Variable to toggle pad/stick displaying.

    this.game_state.restart_level(); // Player lost 1 life, but still have more then 0, so restart level eventually checkpoint.
  } else {
    // Avoid duplication of stick and button.
    this.stick.visible = 0;
    this.buttonFireball.visible = 0;

    GAME_START = false; // Variable to toggle pad/stick displaying.

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
    fireball_properties = {
      'texture': 'fireball_image',
      'group': 'fireballs',
      'direction': this.direction,
      'speed': this.attack_speed
    };
    fireball = new YellowSidd.Fireball(this.game_state, name, fireball_position, fireball_properties);
  } else {
    // If there is a dead fireball then reset it in the new position.
    fireball.reset(fireball_position.x, fireball_position.y);
    fireball.body.velocity.x = (this.direction === "LEFT") ? -this.attack_speed : this.attack_speed;
  }
};