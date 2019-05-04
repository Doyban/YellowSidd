var YellowSidd = YellowSidd || {};

YellowSidd.Gems = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  // Add sounds..
  this.error_sound = this.game.add.audio('error');
  this.upgrade_sound = this.game.add.audio('upgrade');

  // TODO: Comment on deployment.
  // YellowSidd.MessengerAPI.prototype.showProducts(); // Show products.
  // YellowSidd.MessengerAPI.prototype.showPurchases(); // Show purchases.
};

// Set up constructor.
YellowSidd.Gems.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Gems.prototype.constructor = YellowSidd.Gems;

YellowSidd.Gems.prototype.update = function () {
  "use strict";
  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.exit_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.exit_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.exit_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.exit_item.position.y)) + 70 / 2)) {
    this.menu_items[0].select(); // Select first item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_5_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_5_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_5_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_5_item.position.y)) + 140 / 2)) {
    YellowSidd.MessengerAPI.prototype.gems5(); // Open payment method for gems5.
    this.menu_items[1].select(); // Select second item.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_20_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_20_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_20_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_20_item.position.y)) + 140 / 2)) {
    YellowSidd.MessengerAPI.prototype.gems20(); // Open payment method for g2ems20.
    this.menu_items[2].select(); // Select third item.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_50_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_50_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_50_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_50_item.position.y)) + 140 / 2)) {
    YellowSidd.MessengerAPI.prototype.gems50(); // Open payment method for gems50.
    this.menu_items[3].select(); // Select fourth item.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_100_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_100_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_100_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_100_item.position.y)) + 140 / 2)) {
    YellowSidd.MessengerAPI.prototype.gems100(); // Open payment method for gems100.
    this.menu_items[4].select(); // Select fifth item.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_200_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_200_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_200_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_200_item.position.y)) + 140 / 2)) {
    YellowSidd.MessengerAPI.prototype.gems200(); // Open payment method for gems200.
    this.menu_items[5].select(); // Select sixth item.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
};