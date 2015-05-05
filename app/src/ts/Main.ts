/// <reference path="../typings/phaser.d.ts" />
class Main extends Phaser.State {
    public soundManager: SoundManager; // reference our sound manager
    private emitter: Phaser.Particles.Arcade.Emitter;  // the emitter object is what is going to create our explosion effects
    private text: Phaser.Text; // used to add text to our game

    // Phaser.State object exposes preload and create events and automatically calls them at the appropriate times in the game loop
    preload() {
        this.soundManager = new SoundManager(this.game); // it appears that game.add is not available until after the preload is finished
    }

    create() {
        var background = this.add.sprite(this.world.centerX, this.world.centerY, 'bg'); // create a sprite 
        background.anchor.setTo(0.5, 0.5);  // center the background

        this.text = this.game.add.text(16, 16, 'Click the sprite!', { fill: '#ffffff' }); // just some text that tells you what to do
        this.game.physics.startSystem(Phaser.Physics.ARCADE); // startup physics engine
        this.createEnemy(); // create an enemy
        this.soundManager.playForever(Sound.ThemeSong); // play the theme song forever
        this.emitter = this.game.add.emitter(0, 0, 100); // creating a new emitter at 0,0 and giving it the maximum of 100 particles that it can create
        this.emitter.makeParticles(['fire1', 'fire2', 'fire3', 'smoke']); // these are the sprites that our emitter should use when it makes the particles
        this.emitter.setScale(0.4, 0, 0.4, 0); // setting the scale of our particles to a smaller size
    }

    private createEnemy() {
        var enemy = new Enemy(this.game, Math.random() * 500, Math.random() * 500, () => {
            // This is our callback method

            // set the emitter location to the last location of our enemy
            this.emitter.x = enemy.x;
            this.emitter.y = enemy.y;
            //  If the first parameter is true this sets the effect to "explode" which means all particles are emitted at once
            //  The second gives each particle a 500ms lifespan
            //  The third is ignored when using burst/explode mode, else this is a rate at which the emitter emits the particles
            //  The final parameter (10) is how many particles will be emitted
            this.emitter.start(false, 500, 5, 10);

            // randomly choose to play the blast sound or the dog's laugh
            if (Math.random() <= .7) {
                this.soundManager.playOnce(Sound.Blast);
            } else {
                this.soundManager.playOnce(Sound.Laugh);    
            }

            this.createEnemy();
        });
    }
} 