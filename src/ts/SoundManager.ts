/// <reference path="../typings/phaser.d.ts" />
class SoundManager {
    private sounds: IDictionary<Phaser.Sound>; // Dictionary of Phaser sound objects

    constructor(private game: Phaser.Game) {
        this.sounds = new Dictionary([
            { key: Sound.ThemeSong, value: game.add.audio('themesong', 1) },
            { key: Sound.Blast, value: game.add.audio('blast', 1) },
            { key: Sound.Laugh, value: game.add.audio('laugh', 5) }
        ]); // add sounds to the game and store the reference to them
    }

    // this method will play a sound forever at volume 1 from the starting position of the sound
    playForever(sound: Sound): void {
        this.sounds[sound].play('', 0, 1, true); // play forever is not working in Chrome in Phaser 2.2.2 - this is a known bug and is fixed in 2.3 REF: http://www.html5gamedevs.com/topic/13947-audio-not-looping-in-chrome/
    }

    // this method will play a sound one time at volume 1 from the starting position of the sound
    playOnce(sound: Sound): void {
        this.sounds[sound].play('', 0, 1, false);
    }
}

// This enum is used as the key for our dictionary
enum Sound {
    ThemeSong = 0,
    Blast = 1,
    Laugh = 2
}

// simple interface describing a dictionary
// the dictionary is a simple key/value pair collection
interface IDictionary<T> {
    add(key: number, value: T): void;
    remove(key: number): void;
    containsKey(key: number): boolean;
    keys(): number[];
    values(): T[];
}

// the implementation of our dictionary class
class Dictionary<T> implements IDictionary<T> {

    private _keys: number[] = new Array<number>();
    private _values: T[] = new Array<T>();

    constructor(init: { key: number; value: T; }[]) {

        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }

    add(key: number, value: T) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: number) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): number[] {
        return this._keys;
    }

    values(): T[] {
        return this._values;
    }

    containsKey(key: number) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }
}