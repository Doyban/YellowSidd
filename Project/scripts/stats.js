Quintus.GameStats = function(Q) {

    Q.scene("stats", function (stage) {
        var statsContainer = stage.insert(new Q.UI.Container({
                fill: "black",
                opacity: 0.3,
                x: 320/2,
                y: 0,
                border: 1,
                // shadow: 3,
                // shadowColor: "rgba(0,0,0,0.5)",
                w: 340,
                h: 80
            })
        );

        var lives = stage.insert(new Q.UI.Text({
            size: 16,
            label: "Lives: 1",
            color: "white",
            x: -100,
            y: 0
        }), statsContainer);

        var coins = stage.insert(new Q.UI.Text({
            size: 16,
            label: "Score: 0",
            color: "white",
            x: 85,
            y: 0
        }), statsContainer);
    });

    Q.Sprite.extend("Coin", {
        init: function(p) {
            this._super(p, {asset: "coin.png"});
        }
    });

    // To win the game
    Q.Sprite.extend("Flag", {
        init: function(p) {
            this._super(p, {asset: "flag.png"});
        }
    });
}