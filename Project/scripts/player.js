Quintus.ActionPlatformerPlayer = function(Q) {
    // Dodanie gracza.
    Q.Sprite.extend("Player", {
        init: function(p) {
            this._super(p, {
                sheet: "player",
                jumpSpeed: -300,
                speed: 100,
                result: 0,
                lives: 1 ,
                isJumping: false
            });

            this.add("2d, platformerControls");
            var that = this;

            // Dzwiek podczas skakania.
            this.on("jump", function() {
                if (!that.p.isJumping && that.p.vy < 0) {
                    that.p.isJumping = true;
                    Q.audio.play("jump.mp3");
                }
            });

            // Gdy gracz ma cos pod soba to znaczy, ze nie skacze.
            this.on("bump.bottom", function() {
                that.p.isJumping = false;
            });

            this.on("hit.sprite", function(collision) {
                if (collision.obj.isA("Coin")) {
                    Q.audio.play("coin.mp3");

                    collision.obj.destroy();
                    this.p.result++;

                    var resultLabel = Q("UI.Text", 1).items[1]; // [0] - zycia, [1] - coinsy ("stats.js").
                    resultLabel.p.label = "Score: " + this.p.result;
                }

                if (collision.obj.isA("Flag")) {
                    this.destroy();
                    Q.stageScene("endGame", 1, {label: "You won!"});

                    Q.audio.play("kill-enemy.mp3");
                }
            });
        }//,
        //
        //dead: function() {
        //    Q.stageScene("level");
        //    this.p.result = 0;
        //
        //    var resultLabel = Q("UI.Text", 1).items[1];
        //    resultLabel.p.label = "Result: " + this.p.result;
        //}
    });
};