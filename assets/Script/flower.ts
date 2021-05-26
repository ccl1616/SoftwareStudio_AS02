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
export default class flower extends cc.Component {

    private cnt: number = 0;

    @property([cc.SpriteFrame])
    public flower_animation: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // let action = cc.moveBy(2,30,30);
        // this.node.runAction(action);
        this.animation();
    }

    private animation() {
        let action1 = cc.moveBy(1,0,-80);
        let action2 = cc.moveBy(1,0,80);
        this.schedule(function(){
            var id = this.cnt % 2;
            if(id == 0)
                this.node.runAction(action1);
            else 
                this.node.runAction(action2);
            this.getComponent(cc.Sprite).spriteFrame = this.flower_animation[id];
            this.cnt += 1;
        }, 1);
    }
    onBeginContact(contact, self, other) {
        if(other.node.name == "Player"){
            cc.log("flower hits player");
        }
    }
    // update (dt) {}
    
}
