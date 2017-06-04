var YellowSidd = YellowSidd || {};

var game = new Phaser.Game('100%', '100%', Phaser.CANVAS);
game.state.add('BootState', new YellowSidd.BootState());
game.state.add('LoadingState', new YellowSidd.LoadingState());
game.state.add('GameState', new YellowSidd.TiledState());
game.state.start('BootState', true, false, 'assets/levels/level1.json'); // Start BootState state.