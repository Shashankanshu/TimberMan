
const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundController extends cc.Component {

    @property({ type: cc.AudioClip })
    bgmMain: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    axe: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    die: cc.AudioClip = null;

    isSoundOn: boolean = true;
    AudioClips = cc.Enum({})

    public isSoundPlaying(ID: number) {
        var state = cc.audioEngine.getState(ID);
        if (state == cc.audioEngine.AudioState.PLAYING) {
            return true;
        }
        return false;
    }

    public isMusicPlaying() {
        return cc.audioEngine.isMusicPlaying();
    }

    public stopMusic() {
        cc.audioEngine.stopMusic();
    }

    public pauseMusic() {
        cc.audioEngine.pauseMusic();
    }

    public resumeMusic() {
        if (this.isSoundOn) {
            cc.audioEngine.resumeMusic();
        }
    }

    _playSFX(clip: cc.AudioClip, volume: number, loop: boolean) {
        let id = null;

        if (this.isSoundOn && clip != null) {
            id = cc.audioEngine.playEffect(clip, loop || false);
            cc.audioEngine.setVolume(id, volume)
        }
        return id;
    }

    public playSound(audioEnum: number, volume?: number, loop?: boolean) {
        if (!volume || volume > 1) volume = 1;
        if (volume < 0) volume = 0;
        let clip = this[this.enumToString(this.AudioClips, audioEnum)];
        if (Array.isArray(this[this.enumToString(this.AudioClips, audioEnum)])) {
            clip = this.randomArr(this[this.enumToString(this.AudioClips, audioEnum)])
        }
        return this._playSFX(clip, volume, loop)
    }

    public stopSound(audioId) {
        cc.audioEngine.stopEffect(audioId);
    }

    public setVolume(audioId: number, volume: number) {
        if (volume < 0) volume = 0;
        cc.audioEngine.setVolume(audioId, volume);
    }

    private enumToString(enumType, value) {
        for (var k in enumType)
            if (enumType[k] == value) {
                return k;
            }
        return null;
    }

    randomArr(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
}
