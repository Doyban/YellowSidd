var YellowSidd = YellowSidd || {};

YellowSidd.MenuState = function () {
  "use strict";
  YellowSidd.JSONLevelState.call(this); // Extend JSONLevelState class.

  // Set up constructor.
  this.prefab_classes = {
    "background": YellowSidd.Prefab.prototype.constructor,
    "start_state_item": YellowSidd.StartStateItem.prototype.constructor,
    "title": YellowSidd.TextPrefab.prototype.constructor,
    "text": YellowSidd.TextPrefab.prototype.constructor
  };
};

// Set up constructor.
YellowSidd.MenuState.prototype = Object.create(YellowSidd.JSONLevelState.prototype);
YellowSidd.MenuState.prototype.constructor = YellowSidd.MenuState;

YellowSidd.MenuState.prototype.create = function () {
  "use strict";
  var menu_position, menu_items, menu_properties, menu;
  YellowSidd.JSONLevelState.prototype.create.call(this);

  // Adding menu.
  menu_position = new Phaser.Point(0, 0); // Anything, because menu is invisible.
  menu_items = [];
  this.groups.menu_items.forEach(function (menu_item) {
    menu_items.push(menu_item); // Add menu item to menu items array.
  }, this);
  menu_properties = {texture: '', group: 'background', menu_items: menu_items}; // Set properties of the Menu.
  menu = new YellowSidd.Menu(this, 'menu', menu_position, menu_properties); // Create Menu.
};