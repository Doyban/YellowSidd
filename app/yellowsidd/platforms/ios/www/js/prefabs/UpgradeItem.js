var YellowSidd = YellowSidd || {};

YellowSidd.UpgradeItem = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.MenuItem.call(this, game_state, name, position, properties); // Extend MenuItem class.

  this.price = properties.price; // Save price.

  this.upgrade_type = properties.upgrade_type; // Save upgrade type.
  this.upgrade_properties = properties.upgrade_properties; // Save upgrade properties.

  this.selected = false; // Selected property will be used later.
  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  this.level_file = properties.level_file; // Save level file.
  this.state_name = properties.state_name; // Save state name.

  // Add sounds.
  this.error_sound = this.game.add.audio('error');
  this.upgrade_sound = this.game.add.audio('upgrade');
};

// Set up constructor.
YellowSidd.UpgradeItem.prototype = Object.create(YellowSidd.MenuItem.prototype);
YellowSidd.UpgradeItem.prototype.constructor = YellowSidd.UpgradeItem;

YellowSidd.UpgradeItem.prototype.select = function () {
  "use strict";
  // Player can buy upgrades only once per game and if has enough coins.
  if (!this.selected && localStorage.gems >= this.price) {
    // Buy upgrade.
    localStorage.gems -= this.price; // Decrease price of item from current gems of player.
    this.game_state.game.current_upgrades.push({type: this.upgrade_type, properties: this.upgrade_properties}); // Push upgrade type & upgrade properties to the current upgrades.
    this.selected = true; // Player bought upgrade in this game, upgrade is selected.
    this.upgrade_sound.play(); // Play upgrade sound.

    this.game_state.state.start('BootState', true, false, this.level_file, 'SkillsState'); // Start next Phaser state.
  } else {
    this.error_sound.play(); // Play error sound.
    alert("You don't have enough gems to buy this upgrade. The price for that is " + this.price + " gems."); // Not enough gems to buy upgrade.
  }
};