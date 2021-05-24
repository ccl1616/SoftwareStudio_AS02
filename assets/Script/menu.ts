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

    @property(cc.Node)
    left_btn: cc.Node = null;
    @property(cc.Node)
    right_btn: cc.Node = null;

    @property(cc.Node)
    user_info_node: cc.Node = null;

    private email: string;

    world1(){
        cc.director.loadScene("stage1");
    }
    world2(){
        cc.director.loadScene("stage2");
    }
    onLoad() {
        // user info
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) { 
            if(user){
                cc.log("firebase: " + user.email);
                self.email = user.email;
            }
        });
    }

    start () {
        // this.user_info_node.getComponent(cc.Label).string = this.email;
        // btn
        this.left_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            this.world1() }, this );
        
        this.right_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            this.world2() }, this );
    }

    // update (dt) { }
    getEmail(email){
        cc.log("function: " + email);
        this.email = email;
        cc.log("this.email: "+ this.email);
    }

}
