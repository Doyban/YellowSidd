var YellowSidd = YellowSidd || {};

YellowSidd.GameOver = function (game_state, name, position, properties) {
  "use strict";
  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  GAME_START = false; // Variable to toggle pad/stick displaying.
  REACHED_NEXT_LEVEL = false; // Variable to toggle visibility of pad/stick on next level.
  CHECKPOINT_REACHED = false; // Variable to toggle if checkpoint has been reached.

  this.lastScore = global.localStorage.getItem('lastScore'); // Get last score from localStorage.
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

    this.options = {
      message: 'Play YellowSidd!', // not supported on some apps (Facebook, Instagram)
      subject: 'My score in YellowSidd is ' + this.lastScore + "!", // fi. for email
      files: ['https://doyban.com/logos/yellowsidd.png'], // an array of filenames either locally or remotely
      url: 'https://doyban.com/yellowsidd/'
    };
    this.onSuccess = function(result) {
      // alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      // alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };
    this.onError = function(msg) {
      // alert("Sharing failed with message: " + msg);
    };

    window.plugins.socialsharing.shareWithOptions(this.options, this.onSuccess, this.onError); // Share score.
  }
};