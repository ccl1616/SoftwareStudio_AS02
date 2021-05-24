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
export default class membership extends cc.Component {

    @property(cc.Node)
    left_btn: cc.Node = null;
    @property(cc.Node)
    right_btn: cc.Node = null;

    @property(cc.Node)
    email_node: cc.Node = null;
    @property(cc.Node)
    password_node: cc.Node = null;
    @property(cc.Node)
    warning: cc.Node = null;
    
    start () {
        this.left_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            // cc.log("left btn click");
            cc.log(this.email_node.getComponent(cc.EditBox).string); 
            // this.warning.getComponent(cc.Label).string = this.email_node.getComponent(cc.EditBox).string;
        }, this );
        
        this.right_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            // cc.log("right btn click");
            cc.log(this.password_node.getComponent(cc.EditBox).string);  
        }, this );

    }

    // update (dt) {}
}
