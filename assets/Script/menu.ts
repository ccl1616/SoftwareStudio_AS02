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
export default class menu extends cc.Component {
    world1(){
        cc.director.loadScene("stage1");
    }
    world2(){
        cc.director.loadScene("stage2");
    }

    start () {
        let left = cc.find("left_btn");
        let right = cc.find("right_btn");
        left.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            this.world1() }, this );
        
        right.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            this.world2() }, this );
    }

    // update (dt) {}
}
