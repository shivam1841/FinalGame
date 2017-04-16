(function (window) {
    window.game = window.game || {}
    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();
    p.playBtn,p.instructions;
    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();
        this.addTitle();
        this.addButton();
    }
    p.addTitle = function () {
        var titleYPos = 200;
        var title = new createjs.Sprite(spritesheet, 'title');
        title.regX = title.getBounds().width / 2;
        title.x = screen_width / 2;
        title.y = -50;
        createjs.Tween.get(title).to({y: titleYPos}, 5000)
            .call(this.bringTitle, null, this);
        this.addChild(title);
    }
    p.addButton = function () {
        this.playBtn = new ui.SimpleButton('Start Dodging');
        this.playBtn.on('click', this.playGame, this);
        this.playBtn.regX = this.playBtn.width / 2;
        this.playBtn.x = canvas.width / 2;
        this.playBtn.y = 300;
        this.playBtn.alpha = 0;
        this.playBtn.setButton({upColor: '#d2354c', color: '#FFF', borderColor: '#FFF', overColor: '#900'});
        this.addChild(this.playBtn);

        this.instructions = new ui.SimpleButton('Instructions');
        this.instructions.on('click', this.openInstructions, this);
        this.instructions.regX = this.instructions.width / 2;
        this.instructions.x = canvas.width / 2;
        this.instructions.y = 400;
        this.instructions.alpha = 0;
        this.instructions.setButton({upColor: '#d2354c', color: '#FFF', borderColor: '#FFF', overColor: '#900'});
        this.addChild(this.instructions);
    }
    p.bringTitle = function (e) {
        createjs.Tween.get(this.playBtn).to({alpha: 1}, 1000);
        createjs.Tween.get(this.instructions).to({alpha: 1}, 1000);
    }
    p.playGame = function (e) {
        createjs.Sound.play(game.assets.EXPLOSION);
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.openInstructions = function (e) {
        createjs.Sound.play(game.assets.EXPLOSION);
        this.dispatchEvent(game.GameStateEvents.INSTRUCTIONS);
    }
    window.game.GameMenu = GameMenu;
}(window));