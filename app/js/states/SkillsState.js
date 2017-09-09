var YellowSidd = YellowSidd || {};

YellowSidd.SkillsState = function () {
  "use strict";
  YellowSidd.JSONLevelState.call(this); // Extend JSONLevelState class.

  // Set up constructors of prefabs.
  this.prefab_classes = {
    'background': YellowSidd.Prefab.prototype.constructor,
    'gem': YellowSidd.Prefab.prototype.constructor,
    'start_state_item': YellowSidd.StartStateItem.prototype.constructor
  };
};

// Set up constructor.
YellowSidd.SkillsState.prototype = Object.create(YellowSidd.JSONLevelState.prototype);
YellowSidd.SkillsState.prototype.constructor = YellowSidd.SkillsState;

YellowSidd.SkillsState.prototype.create = function () {
  "use strict";
  var menu_position, menu_items, menu_properties, menu;
  YellowSidd.JSONLevelState.prototype.create.call(this); // Create groups and prefabs.

  // Add menu.
  menu_position = new Phaser.Point(0,0); // Anything, because menu is invisible.
  menu_items = [];
  this.groups.menu_items.forEach(function (menu_item) {
    menu_items.push(menu_item); // Add menu item to menu items array.
  }, this);
  menu_properties = {texture: '', group: 'background', menu_items: menu_items}; // Set properties of the menu.
  menu = new YellowSidd.Skills(this, 'menu', menu_position, menu_properties); // Create menu.
};