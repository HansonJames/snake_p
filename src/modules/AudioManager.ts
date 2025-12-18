export class AudioManager {
    private bgm: HTMLAudioElement;
    private eatSound: HTMLAudioElement;
    private deathSound: HTMLAudioElement;

    constructor() {
        this.bgm = new Audio('/src/audios/game_bgm.mp3');
        this.bgm.loop = true;
        this.eatSound = new Audio('/src/audios/eat_sound.mp3');
        this.deathSound = new Audio('/src/audios/death_sound.mp3');
    }

    playBgm() {
        this.bgm.play().catch(e => console.log('Audio play failed:', e));
    }

    stopBgm() {
        this.bgm.pause();
        this.bgm.currentTime = 0;
    }

    playEat() {
        this.eatSound.currentTime = 0;
        this.eatSound.play().catch(e => console.log('Audio play failed:', e));
    }

    playDeath() {
        this.deathSound.currentTime = 0;
        this.deathSound.play().catch(e => console.log('Audio play failed:', e));
    }
}
