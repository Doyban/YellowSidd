var YellowSidd = YellowSidd || {};

YellowSidd.Score = function (game_state, name, position, properties) {
  "use strict";
  Phaser.Text.call(this, game_state.game, position.x, position.y, properties.text);

  this.game_state = game_state;

  this.name = name; // Save game state name.

  this.game_state.groups[properties.group].add(this);

  this.fixedToCamera = true; // Must be fixed to camera to be visible while player moving.
};

YellowSidd.Score.prototype = Object.create(Phaser.Text.prototype);
YellowSidd.Score.prototype.constructor = YellowSidd.Score;

YellowSidd.Score.prototype.update = function () {
  "use strict";
  this.text = "Score: " + this.game_state.prefabs.player.score; // Update text to player current score.
};