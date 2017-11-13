var YellowSidd = YellowSidd || {};

YellowSidd.Lives = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  this.frame = +properties.frame;
  this.visible = false; // Will be invisible, since we will use asset only to create new sprites showing the player lives.

  this.spacing = +properties.spacing;

  this.fixedToCamera = true; // Must be fixed to camera to be visible while player moving.
  this.initial_position = new Phaser.Point(this.x, this.y); // Saving initial position if it gets changed by window scaling.

  // this.lives = this.game_state.prefabs.player.lives; // Get number of lives.
  // this.lives = properties.lives; // Get number of lives.
  this.lives = [];
  this.dead_life = null;
  this.create_lives(this.lives);
};

YellowSidd.Lives.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Lives.prototype.constructor = YellowSidd.Lives;

YellowSidd.Lives.prototype.update = function () {
  "use strict";
  // Check if the player number of lives has changed and, if so, we call an "update_lives" method.
  if (this.game_state.prefabs.player.lives !== this.lives.length) {
    this.update_lives();
  }
};

YellowSidd.Lives.prototype.create_lives = function (number_of_lives) {
  "use strict";
  var life_index, life_position, life;

  // Create a sprite for each one of the player lives.
  for (life_index = 0; life_index < number_of_lives; life_index += 1) {
    // Since the player live asset is already loaded we can use its width and the Lives prefab position to find the position for each live and draw then on the screen.
    life_position = new Phaser.Point(this.initial_position.x + (life_index * (this.width + this.spacing)), this.initial_position.y);
    life = new Phaser.Sprite(this.game_state.game, life_position.x, life_position.y, this.texture, this.frame);

    life.fixedToCamera = true; // Must be fixed to camera to be visible while player moving.

    this.game_state.groups.hud.add(life); // Add life to the HUD.
    this.lives.push(life); // Fill an array with a sprite for each one of the player lives.
  }
};

// Assume the number of lives can increase or decrease by only one between two updates. This makes sense because the update method will be called many times per second, and the player can't die or get lives faster than that.
YellowSidd.Lives.prototype.update_lives = function () {
  "use strict";
  var life, life_position;
  life = this.lives[this.lives.length - 1];

  // Check if the number of lives has decreased or increased.
  if (this.game_state.prefabs.player.lives < this.lives.length) {
    // The player died, so we have to kill last life in the array.
    life.kill();
    this.dead_life = life;
    this.lives.pop();
  } else {
    // The player received another life.
    if (!this.dead_life) {
      // If there is no dead life we can reuse and then create a new one.
      life_position = new Phaser.Point(this.initial_position.x + (this.lives.length * (this.width + this.spacing)), this.initial_position.y); // Set up position for new life.
      life = new Phaser.Sprite(this.game_state.game, life_position.x, life_position.y, this.texture, this.frame); // Set up sprite for new life.
      life.fixedToCamera = true; // Must be fixed to camera to be visible while player moving.
      this.game_state.groups.hud.add(life); // Add life to the HUD.
    } else {
      // If there is a dead life then just reset it.
      life = this.dead_life;
      life_position = new Phaser.Point(this.initial_position.x + ((this.lives.length - 1) * (this.width + this.spacing)), this.initial_position.y); // Set up position for lives.
      life.reset(life_position.x, life_position.y); // Reset lives.
      this.dead_life = null;
    }
    this.lives.push(life);
  }
};