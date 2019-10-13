var YellowSidd = YellowSidd || {};

YellowSidd.Upgrades = function (game, parent) {
  "use strict";
  Phaser.Plugin.call(this, game, parent); // Extend Phaser.Plugin class.
};

// Set up constructor.
YellowSidd.Upgrades.prototype = Object.create(Phaser.Plugin.prototype);
YellowSidd.Upgrades.prototype.constructor = YellowSidd.Upgrades;

// Set plugin properties.
YellowSidd.Upgrades.prototype.init = function (game_state) {
  "use strict";
  this.game_state = game_state; // Save game state.

  // Set up prefabs of constructors.
  this.upgrade_classes = {
    "extra_heart": YellowSidd.ExtraHeart.prototype.constructor,
    "extra_jump": YellowSidd.ExtraJump.prototype.constructor,
    "extra_speed": YellowSidd.ExtraSpeed.prototype.constructor
  };
};

YellowSidd.Upgrades.prototype.apply_upgrades = function (upgrades) {
  "use strict";

  // Iterate through all upgrades.
  upgrades.forEach(function (upgrade_data) {
    var upgrade;

    // Check if upgrade class type is in upgrade classes property.
    if (this.upgrade_classes.hasOwnProperty(upgrade_data.type)) {
      upgrade = new this.upgrade_classes[upgrade_data.type](this.game_state, upgrade_data.properties); // Create Upgrade classes.
      upgrade.apply();
    }
  }, this);
};