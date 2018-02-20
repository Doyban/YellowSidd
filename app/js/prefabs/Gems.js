var YellowSidd = YellowSidd || {};

YellowSidd.Gems = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  // Add sounds.
  this.error_sound = this.game.add.audio('error'); // TODO: Add error sound when no enough money.
  this.upgrade_sound = this.game.add.audio('upgrade'); // TODO: Add upgrade sound when purchased.
};

// Set up constructor.
YellowSidd.Gems.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Gems.prototype.constructor = YellowSidd.Gems;

YellowSidd.Gems.prototype.update = function () {
  "use strict";
  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.exit_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.exit_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.exit_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.exit_item.position.y)) + 70 / 2)) {
    this.menu_items[0].select(); // Select second item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_5_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_5_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_5_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_5_item.position.y)) + 140 / 2)) {
    this.menu_items[1].select(); // Select third item.
    localStorage.gems = parseInt(localStorage.gems) + 5; // Add 5 gems.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_20_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_20_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_20_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_20_item.position.y)) + 140 / 2)) {
    this.menu_items[2].select(); // Select fourth item.
    localStorage.gems = parseInt(localStorage.gems) + 20; // Add 20 gems.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_50_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_50_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_50_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_50_item.position.y)) + 140 / 2)) {
    this.menu_items[3].select(); // Select fifth item.
    localStorage.gems = parseInt(localStorage.gems) + 50; // Add 50 gems.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_100_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_100_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_100_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_100_item.position.y)) + 140 / 2)) {
    this.menu_items[4].select(); // Select sixth item.
    localStorage.gems = parseInt(localStorage.gems) + 100; // Add 100 gems.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.gems_200_item.position.x) - 140 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.gems_200_item.position.x)) + 140 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.gems_200_item.position.y) - 140 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.gems_200_item.position.y)) + 140 / 2)) {
    this.menu_items[5].select(); // Select seventh item.
    localStorage.gems = parseInt(localStorage.gems) + 200; // Add 200 gems.
    this.upgrade_sound.play(); // Play upgrade sound.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.information_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.information_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.information_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.information_item.position.y)) + 70 / 2)) {
    this.menu_items[6].select(); // Select eighth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.invite_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.invite_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.invite_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.invite_item.position.y)) + 70 / 2)) {
    this.menu_items[7].select(); // Select ninth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.share_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.share_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.share_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.share_item.position.y)) + 70 / 2)) {
    this.menu_items[8].select(); // Select eleventh item.
  }
};