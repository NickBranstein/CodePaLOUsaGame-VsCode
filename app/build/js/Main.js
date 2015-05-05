var __extends=this.__extends||function(t,e){function r(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);r.prototype=e.prototype,t.prototype=new r},Main=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),e.prototype.preload=function(){this.soundManager=new SoundManager(this.game)},e.prototype.create=function(){var t=this.add.sprite(this.world.centerX,this.world.centerY,"bg");t.anchor.setTo(.5,.5),this.text=this.game.add.text(16,16,"Click the sprite!",{fill:"#ffffff"}),this.game.physics.startSystem(Phaser.Physics.ARCADE),this.createEnemy(),this.soundManager.playForever(0),this.emitter=this.game.add.emitter(0,0,100),this.emitter.makeParticles(["fire1","fire2","fire3","smoke"]),this.emitter.setScale(.4,0,.4,0)},e.prototype.createEnemy=function(){var t=this,e=new Enemy(this.game,500*Math.random(),500*Math.random(),function(){t.emitter.x=e.x,t.emitter.y=e.y,t.emitter.start(!1,500,5,10),t.soundManager.playOnce(Math.random()<=.7?1:2),t.createEnemy()})},e}(Phaser.State);