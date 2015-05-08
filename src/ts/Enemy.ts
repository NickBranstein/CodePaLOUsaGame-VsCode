/// <reference path="../typings/phaser.d.ts" />
class Enemy extends Phaser.Sprite {
    constructor(public game: Phaser.Game, x: number, y: number, onClick: () => void) {
        super(game, x, y, 'duck'); // the base sprite object allows us to give it a location and a key to reference it by

        this.anchor.setTo(0.5, 0.5); // center the sprite 
        this.name = 'tweeters';
        this.animations.add('fly', [3, 4, 5]); // create a animation named fly using positions 3, 4, 5 in the spritemap - positions are 0 based - this array parameter can be null to use all the frames
        this.animations.play('fly', 6, true); // make the sprite play the animation over and over at 6 frames per second. Each position in the spritemap is a frame
        this.inputEnabled = true;
        this.events.onInputDown.add(() => {
            onClick();
            this.destroy();
        }, this);

        game.time.events.loop(2000, () => {
            // Every 2 seconds of our game loop, add a tween to our enemy to a random location.  The tween will take 1.75s to complete and start immediately
            // Phaser.Easing.Quadratic.InOut is a movement effect/animation effect that we add to the movement, this can be something like a yoyo effect
            // The easing effect will make it speed up and slow down - the enemy "eases" into the movement
            game.add.tween(this).to({ x: game.world.randomX, y: game.world.randomY }, 1750, Phaser.Easing.Quadratic.InOut, true);
        }, this);

        game.add.existing(this); // add it to our game
    }    
} 