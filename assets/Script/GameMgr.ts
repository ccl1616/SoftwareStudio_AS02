// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property({type:cc.AudioClip})
    bgm: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    jumpSound: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    loseOneLife: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    coin: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    kick: cc.AudioClip = null;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // this.playBGM();
    }
    
    onKeyDown(event) {
        if(event.keyCode == cc.macro.KEY.k){
            this.playJumpEffect();
        }
    }

    start () {
        // this.playBGM();
    }

    // update (dt) {}

    playBGM(){
        cc.audioEngine.playMusic(this.bgm, false);
    }
    stopBGM(){
        cc.audioEngine.pauseMusic();
    }
    playJumpEffect(){
        cc.audioEngine.playEffect(this.jumpSound, false);
    }
    playLoseOneEffect(){
        cc.audioEngine.playEffect(this.loseOneLife, false);
    }
    playCoinEffect(){
        cc.audioEngine.playEffect(this.coin, false);
    }
    playKickEffect(){
        cc.audioEngine.playEffect(this.kick, false);
    }
}
