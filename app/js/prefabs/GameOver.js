var YellowSidd = YellowSidd || {};

YellowSidd.GameOver = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.
};

// Set up constructor.
YellowSidd.GameOver.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.GameOver.prototype.constructor = YellowSidd.GameOver;

YellowSidd.GameOver.prototype.update = function () {
  "use strict";

  /**
   * Choose appropriate menu item.
   * To get action on whole item dimensions while swiping, item needs to be get from anchor of itself and substract & add half of width & height to it, then whole item dimensions are on action for swiping.
   */
  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.exit_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.exit_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.exit_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.exit_item.position.y)) + 70 / 2)) {
    this.menu_items[0].select(); // Select first item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.share_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.share_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.share_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.share_item.position.y)) + 70 / 2)) {
    this.menu_items[1].select(); // Select second item.
  }
};