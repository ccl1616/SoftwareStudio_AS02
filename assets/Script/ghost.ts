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
export default class ghost extends cc.Component {

    private isTouched: boolean = false;
    private debug: boolean = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;    
    }

    start () {}

    update (dt) {}

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player"){
            if(!this.isTouched){
                cc.log("first hit");
                this.isTouched = true;
                // let action = cc.fadeOut(5);
                let action = cc.sequence( cc.moveBy(1,0,-5),cc.fadeOut(3.0));
                this.node.runAction(action);
                if(!this.debug)
                    this.scheduleOnce( function() { self.node.destroy(); } , 4);
            }
            else cc.log("not first");
        }
    }
}
