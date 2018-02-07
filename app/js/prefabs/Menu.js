var YellowSidd = YellowSidd || {};

YellowSidd.Menu = function (game_state, name, position, properties) {
  "use strict";
  // this.game.load.spritesheet('music', 'asset/music.png', 49, 49);

  YellowSidd.Prefab.call(this, game_state, name, position, properties); // Extend Prefab class.

  this.visible = false; // Make this prefab invisible.

  this.menu_items = properties.menu_items; // List of menu items.

  this.swipe = this.game.input.activePointer; // Allow player to navigate by swiping.

  this.background_sound = this.game.add.audio('background', .3, true); // Add sound.
  this.coin_sound = this.game.add.audio('coin'); // Add sound.

  // Sound and audio buttons.
  this.buttonAudio = this.game.add.button(this.game.width * 0.38, this.game.height * 0.06, 'audio', this.toggleGameAudio, this);
  this.buttonAudioToggle = false;
  this.buttonMusic = this.game.add.button(this.game.width * 0.54, this.game.height * 0.06, 'music', this.toggleBackgroundMusic, this);
  this.buttonMusicToggle = false;

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
  if (this.swipe.isDown && (this.swipe.position.x >= ((this.game_state.prefabs.game_item.position.x) - 240 / 2) && this.swipe.position.x <= ((this.game_state.prefabs.game_item.position.x)) + 240 / 2) && (this.swipe.position.y >= ((this.game_state.prefabs.game_item.position.y) - 240 / 2) && this.swipe.position.y <= ((this.game_state.prefabs.game_item.position.y)) + 240 / 2)) {
    this.menu_items[0].select(); // Select sixth item.
  }
};

// Toggle background music.
YellowSidd.Menu.prototype.toggleBackgroundMusic = function () {
  "use strict";
  this.background_sound.mute = !this.background_sound.mute; // Toggle background music.
  this.buttonMusicToggle = !this.buttonMusicToggle; // Toggle background music button.
  this.buttonMusic.frame = (this.buttonMusicToggle) ? 1 : 0; // Show appropriate background music button.
};

// Toggle game audio.
YellowSidd.Menu.prototype.toggleGameAudio = function () {
  "use strict";
  this.buttonAudioToggle = !this.buttonAudioToggle; // Toggle game audio button.
  this.buttonAudio.frame = this.buttonAudioToggle ? 1 : 0; // Show appropriate background music button.
  PLAY_SOUND = !PLAY_SOUND; // Toggle game sounds.
};