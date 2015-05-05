/// <reference path="../typings/phaser.d.ts" />
class CodePaLOUsaGame extends Phaser.Game {
    constructor() {
        // Set our game to 891x558 which happens to be the size of our background
        // Phaser.AUTO tells phaser to automatically choose between canvas and webgl for rendering
        super(891, 558, Phaser.AUTO, 'gameContent');

        this.state.add('Preloader', Preloader, false); // setup states for our game and do not autostart that state - these could be main menu, game over, levels, etc...
        this.state.add('Main', Main, false);

        this.state.start('Preloader');
    }
}

window.onload = () => {
    var game = new CodePaLOUsaGame(); // create a new instance of our game when the page loads
};