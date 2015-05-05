/// <reference path="../typings/phaser.d.ts" />
class Preloader extends Phaser.State {
    // preload and create are exposed by the Phaser.State
    preload() {
        this.load.image('bg', 'images/background.png'); // load assests
        this.load.image('fire1', 'images/fire1.png');
        this.load.image('fire2', 'images/fire2.png');
        this.load.image('fire3', 'images/fire3.png');
        this.load.image('smoke', 'images/smoke-puff.png');
        this.load.audio('themesong', ['sounds/themesong.ogg', 'sounds/themesong.mp3']); // load an audio asset - we can pass in an ogg and mp3 file to the array to fall back to if we want
        this.load.audio('blast', ['sounds/blast.ogg', 'sounds/blast.mp3']);
        this.load.audio('laugh', ['sounds/laugh.ogg', 'sounds/laugh.mp3']);
        this.load.spritesheet('duck', 'images/duck-hunt-ducks-34x34.png', 34, 34, 9); // preload a spritemap, each sprite is 34x34 and there are 9 images in the map
    }

    create() {
        this.startGame();
    }

    startGame() {
        this.game.state.start('Main', true, false); // load the next state of the game and clear the game world
    }
}