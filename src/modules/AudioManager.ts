import bgmUrl from '../audios/game_bgm.mp3';
import eatSoundUrl from '../audios/eat_sound.mp3';
import deathSoundUrl from '../audios/death_sound.mp3';

export class AudioManager {
    private bgm: HTMLAudioElement;
    private eatSound: HTMLAudioElement;
    private deathSound: HTMLAudioElement;

    constructor() {
        this.bgm = new Audio(bgmUrl);
        this.bgm.loop = true;
        this.eatSound = new Audio(eatSoundUrl);
        this.deathSound = new Audio(deathSoundUrl);
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
