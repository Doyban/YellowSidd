var YellowSidd = YellowSidd || {};

YellowSidd.Menu = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  this.background_sound = this.game.add.audio('background', .3, true); // Add sound.

  // Avoid to new track, while changing states.
  if (!PLAY_MUSIC) {
    this.background_sound.play(); // Play background sound.
    PLAY_MUSIC = true;
  }
};

// Set up constructor.
YellowSidd.Menu.prototype = Object.create(YellowSidd.Prefab.prototype);
YellowSidd.Menu.prototype.constructor = YellowSidd.Menu;

YellowSidd.Menu.prototype.update = function () {
  "use strict";
  /**
   * Choose appropriate menu item.
   * To get action on whole item dimensions while swiping, item needs to be get from anchor of itself and substract & add half of width & height to it, then whole item dimensions are on action for swiping.
   */
  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.audio_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.audio_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.audio_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.audio_item.position.y)) + 70 / 2)) {
    this.menu_items[0].select(); // Select first item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.exit_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.exit_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.exit_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.exit_item.position.y)) + 70 / 2)) {
    this.menu_items[1].select(); // Select second item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.firebase_facebook_item.position.x) - 64 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.firebase_facebook_item.position.x)) + 64 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.firebase_facebook_item.position.y) - 64 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.firebase_facebook_item.position.y)) + 64 / 2)) {
    this.menu_items[2].select(); // Select third item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.firebase_google_item.position.x) - 57 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.firebase_google_item.position.x)) + 57 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.firebase_google_item.position.y) - 64 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.firebase_google_item.position.y)) + 64 / 2)) {
    this.menu_items[3].select(); // Select fourth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.firebase_twitter_item.position.x) - 64 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.firebase_twitter_item.position.x)) + 64 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.firebase_twitter_item.position.y) - 64 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.firebase_twitter_item.position.y)) + 64 / 2)) {
    this.menu_items[4].select(); // Select fifth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.game_item.position.x) - 240 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.game_item.position.x)) + 240 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.game_item.position.y) - 240 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.game_item.position.y)) + 240 / 2)) {
    this.menu_items[5].select(); // Select sixth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.information_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.information_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.information_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.information_item.position.y)) + 70 / 2)) {
    this.menu_items[6].select(); // Select seventh item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.invite_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.invite_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.invite_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.invite_item.position.y)) + 70 / 2)) {
    this.menu_items[7].select(); // Select eighth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.music_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.music_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.music_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.music_item.position.y)) + 70 / 2)) {
    this.menu_items[8].select(); // Select ninth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.purchase_item.position.x) - 240 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.purchase_item.position.x)) + 240 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.purchase_item.position.y) - 240 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.purchase_item.position.y)) + 240 / 2)) {
    this.menu_items[9].select(); // Select tenth item.
  }
  else if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.share_item.position.x) - 70 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.share_item.position.x)) + 70 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.share_item.position.y) - 70 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.share_item.position.y)) + 70 / 2)) {
    this.menu_items[10].select(); // Select eleventh item.
  }
};