/// <reference path="../typings/phaser.d.ts" />
class Preloader extends Phaser.State {
    // preload and create are exposed by the Phaser.State
    preload() {
        this.load.image('bg', '../build/images/background.png'); // load assests
        this.load.image('fire1', '../build/images/fire1.png');
        this.load.image('fire2', '../build/images/fire2.png');
        this.load.image('fire3', '../build/images/fire3.png');
        this.load.image('smoke', '../build/images/smoke-puff.png');
        this.load.audio('themesong', ['../build/sounds/themesong.ogg', '../build/sounds/themesong.mp3']); // load an audio asset - we can pass in an ogg and mp3 file to the array to fall back to if we want
        this.load.audio('blast', ['../build/sounds/blast.ogg', '../build/sounds/blast.mp3']);
        this.load.audio('laugh', ['../build/sounds/laugh.ogg', '../build/sounds/laugh.mp3']);
        this.load.spritesheet('duck', '../build/images/duck-hunt-ducks-34x34.png', 34, 34, 9); // preload a spritemap, each sprite is 34x34 and there are 9 images in the map
    }

    create() {
        this.startGame();
    }

    startGame() {
        this.game.state.start('Main', true, false); // load the next state of the game and clear the game world
    }
}