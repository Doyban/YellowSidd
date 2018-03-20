var YellowSidd = YellowSidd || {};

YellowSidd.LoadingState = function () {
  "use strict";
  Phaser.State.call(this);
};

YellowSidd.LoadingState.prototype = Object.create(Phaser.State.prototype);
YellowSidd.LoadingState.prototype.constructor = YellowSidd.LoadingState;

YellowSidd.LoadingState.prototype.init = function (level_data, next_state) {
  "use strict";
  this.level_data = level_data; // Init level data.
  this.next_state = next_state; // Init next state.
};

YellowSidd.LoadingState.prototype.preload = function () {
  "use strict";
  var assets, asset_loader, asset_key, asset;
  assets = this.level_data.assets;

  for (asset_key in assets) { // Load assets according to asset key.
    if (assets.hasOwnProperty(asset_key)) {
      asset = assets[asset_key];
      switch (asset.type) {
        case 'image':
          this.load.image(asset_key, asset.source);
          break;
        case 'spritesheet':
          this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
          break;
        case 'tilemap':
          this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
          break;
      }
    }
  }

  // Load sound and audio.
  this.load.audio('background', [
    'assets/audios/background.ogg',
    'assets/audios/background.mp3'
  ]);
  this.load.audio('checkpoint', [
    'assets/audios/checkpoint.ogg',
    'assets/audios/checkpoint.mp3'
  ]);
  this.load.audio('coin', [
    'assets/audios/coin.ogg',
    'assets/audios/coin.mp3'
  ]);
  this.load.audio('error', [
    'assets/audios/error.ogg',
    'assets/audios/error.mp3'
  ]);
  this.load.audio('fireball', [
    'assets/audios/fireball.ogg',
    'assets/audios/fireball.mp3'
  ]);
  this.load.audio('game_over', [
    'assets/audios/game_over.mp3',
    'assets/audios/game_over.ogg'
  ]);
  this.load.audio('get_fireball', [
    'assets/audios/get_fireball.ogg',
    'assets/audios/get_fireball.mp3'
  ]);
  this.load.audio('get_life', [
    'assets/audios/get_life.ogg',
    'assets/audios/get_life.mp3'
  ]);
  this.load.audio('jump', [
    'assets/audios/jump.ogg',
    'assets/audios/jump.mp3'
  ]);
  this.load.audio('kill_enemy', [
    'assets/audios/kill_enemy.ogg',
    'assets/audios/kill_enemy.mp3'
  ]);
  this.load.audio('lost_heart', [
    'assets/audios/lost_heart.ogg',
    'assets/audios/lost_heart.mp3'
  ]);
  this.load.audio('walking', [
    'assets/audios/walking.ogg',
    'assets/audios/walking.mp3'
  ]);
  this.load.audio('reach_goal', [
    'assets/audios/reach_goal.ogg',
    'assets/audios/reach_goal.mp3'
  ]);
  this.load.audio('upgrade', [
    'assets/audios/upgrade.ogg',
    'assets/audios/upgrade.mp3'
  ]);

  // Load sound and audio spritesheets.
  this.game.load.spritesheet('audio', 'assets/spritesheets/audio_spritesheet.png', 70, 70);
  this.game.load.spritesheet('music', 'assets/spritesheets/music_spritesheet.png', 70, 70);
};

YellowSidd.LoadingState.prototype.create = function () {
  "use strict";
  this.game.state.start(this.next_state, true, false, this.level_data); // Load GameState state.
};