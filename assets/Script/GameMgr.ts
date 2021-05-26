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
export default class gameMgr extends cc.Component {

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

    @property({type:cc.AudioClip})
    stomp: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    powerup: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    powerdown: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    levelclear: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    gameover: cc.AudioClip = null;

    @property(cc.Node)
    life_data: cc.Node = null;
    @property(cc.Node)
    coin_data: cc.Node = null;
    @property(cc.Node)
    score_data: cc.Node = null;

    @property(cc.Node)
    time_num: cc.Node = null;

    private email: string;
    private name: string;
    private life_num: number = 0;
    private coin_num: number = 0;
    private score_num: number = 0;
    private dataget: boolean = false;
    private dataget2: boolean = false;

    private time: number = 10;
    private debug: boolean = false;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        if(!this.debug)
            this.playBGM();
        // user info
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) { 
            if(user){
                self.email = user.email;
                self.name = user.displayName;
            }
        });
        var ref = firebase.database().ref('list');
        ref.once('value').then(function(snapshot){ 
            // get info
            snapshot.forEach(function(childshot) {
                // search for this user's info
                var childData = childshot.val();
                if(childData.email == self.email){
                    self.life_num = childData.life;
                    self.coin_num = childData.coin;
                    self.score_num = childData.score;
                    self.dataget = true;
                }
            })
        }).catch(e => cc.log("get info error"));
    }
    
    onKeyDown(event) {
        if(event.keyCode == cc.macro.KEY.k){
            this.playJumpEffect();
        }
    }

    start () { 
       // var self = this;
        this.schedule(()=>{
            if(this.time != 0)
                this.time --;
            this.time_num.getComponent(cc.Label).string = this.time.toString();
        },1);
    }

    update (dt) {
        if(this.dataget){
            this.life_data.getComponent(cc.Label).string = this.life_num.toString();
            this.coin_data.getComponent(cc.Label).string = this.coin_num.toString();
            this.score_data.getComponent(cc.Label).string = this.score_num.toString();
            this.dataget = false;
        }
    }

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
    playStompEffect(){
        cc.audioEngine.playEffect(this.stomp, false);
    }
    playPowerupEffect(){
        cc.audioEngine.playEffect(this.powerup, false);
    }
    playPowerdownEffect(){
        cc.audioEngine.playEffect(this.powerdown, false);
    }
    playLevelclearEffect(){
        cc.audioEngine.playEffect(this.levelclear, false);
    }
    playGameoverEffect(){
        cc.audioEngine.playEffect(this.gameover, false);
    }

    update_coin(){
        this.coin_num ++;
        this.update_firebase("coin",this.coin_num);
    }
    update_score(num){
        if(this.score_num == 0 && num < 0)
            this.score_num = 0;
        else this.score_num += num;
        this.update_firebase("score",this.score_num);
    }
    update_life(num){
        if(this.life_num + num <= 0)
            this.life_num = 0;
        else this.life_num += num;
        this.update_firebase("life",this.life_num);
    }

    update_firebase(type,num){
        var self = this;
        if(type == "coin"){
            var ref = firebase.database().ref('list');
            ref.once('value').then(function(snapshot){ 
                // get info
                snapshot.forEach(function(childshot) {
                    // search for this user's info
                    var childData = childshot.val();
                    if(childData.email == self.email){
                        var data = {
                            coin: num
                        }
                        ref.child(self.name).update(data);
                        self.dataget = true;
                        // cc.log("update firebase " + self.name + " coin:" + num);
                    }
                })
            }).catch(e => cc.log("update firebase catch, coin"));
        }
        else if(type == "score"){
            var ref = firebase.database().ref('list');
            ref.once('value').then(function(snapshot){ 
                // get info
                snapshot.forEach(function(childshot) {
                    // search for this user's info
                    var childData = childshot.val();
                    if(childData.email == self.email){
                        var data = {
                            score: num
                        }
                        ref.child(self.name).update(data);
                        self.dataget = true;
                        // cc.log("update firebase " + self.name + " coin:" + num);
                    }
                })
            }).catch(e => cc.log("update firebase catch, score"));
        }
        else if(type == "life"){
            var ref = firebase.database().ref('list');
            ref.once('value').then(function(snapshot){ 
                // get info
                snapshot.forEach(function(childshot) {
                    // search for this user's info
                    var childData = childshot.val();
                    if(childData.email == self.email){
                        var data = {
                            life: (num == 0) ?5:num
                        }
                        ref.child(self.name).update(data);
                        // self.dataget = true;
                        // cc.log("update firebase " + self.name + " coin:" + num);
                        if(num == 0)
                            cc.director.loadScene("game_over");
                    }
                })
            }).catch(e => cc.log("update firebase catch, life"));
        }
    }
}
