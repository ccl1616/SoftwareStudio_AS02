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
export default class coin extends cc.Component {

    @property(cc.SpriteFrame)
    coin1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    coin2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    coin3: cc.SpriteFrame = null;
    
    
    private counter: number;

    onLoad () {
        this.getComponent(cc.Sprite).spriteFrame == this.coin1;
        this.counter = 0;
        // this.animation();
    }

    start() {
        this.getComponent(cc.Sprite).spriteFrame == this.coin1;
        this.counter = 0;
        // this.animation();
    }

    update (dt) {
        // cc.log(this.counter);
        if(this.counter == 2) this.counter = 0;
        else this.counter ++;
        // cc.log(this.counter%4);
        this.animation();
    }

    private animation(){
        
        // cc.log(this.counter);
        if(this.counter == 0)
            this.getComponent(cc.Sprite).spriteFrame == this.coin1;
        else if(this.counter == 1)
            this.getComponent(cc.Sprite).spriteFrame == this.coin2;
        else 
            this.getComponent(cc.Sprite).spriteFrame == this.coin3;
    }
}
