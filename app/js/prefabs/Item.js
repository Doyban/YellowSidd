var YellowSidd = YellowSidd || {};

YellowSidd.Item = function (game_state, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, position, properties);

  this.game_state.game.physics.arcade.enable(this);
  this.body.immovable = true; // Have an immovable physics body.
  this.body.allowGravity = false;

  this.anchor.setTo(0.5);
};

YellowSidd.Item.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Item.prototype.constructor = YellowSidd.Item;

YellowSidd.Item.prototype.update = function () {
  "use strict";
  this.game_state.game.physics.arcade.collide(this, this.game_state.layers.collision);
  this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_item, null, this); // Check for overlap with the player and c all a "collect_item" method if that happens.
};

YellowSidd.Item.prototype.collect_item = function () {
  "use strict";
  this.kill(); // By default the item is destroyed when collected, but we will overwrite it in our new items prefabs to do what we want.
};
