var YellowSidd = YellowSidd || {};

YellowSidd.Coin = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties);

  this.score = +properties.score;

  this.game_state.game.physics.arcade.enable(this);
  this.body.immovable = true;
  this.body.allowGravity = false;

  this.anchor.setTo(0.5);

  this.coin_sound = this.game.add.audio('coin'); // Add sound.
};

YellowSidd.Coin.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Coin.prototype.constructor = YellowSidd.Coin;

YellowSidd.Coin.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_coin, null, this);
};

YellowSidd.Coin.prototype.collect_coin = function (coin, player) {
  "use strict";
  // Kill coin and increase score.
  this.kill();
  player.score += this.score;

  // Play sound only if player left button sound as on mode.
  if (PLAY_SOUND) {
    this.coin_sound.play(); // Play coin sound.
  }
};