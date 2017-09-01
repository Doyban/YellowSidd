var YellowSidd = YellowSidd || {};

YellowSidd.Menu = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.
};

// Set up constructor.
YellowSidd.Menu.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Menu.prototype.constructor = YellowSidd.Menu;

YellowSidd.Menu.prototype.update = function () {
  "use strict";

  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.game_item.position.x) - 240 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.game_item.position.x)) + 240 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.game_item.position.y) - 240 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.game_item.position.y)) + 240 / 2)) {
    this.menu_items[5].select(); // Select first item.
  }
};