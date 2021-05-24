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
    warningbox: cc.Node = null;
    
    start () {
        // get input
        var info_email = this.email_node.getComponent(cc.EditBox).string;
        var info_password = this.password_node.getComponent(cc.EditBox).string;

        // sign in btn
        this.left_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            // auth sign in
            var info_email = this.email_node.getComponent(cc.EditBox).string;
            var info_password = this.password_node.getComponent(cc.EditBox).string;
            firebase.auth().signInWithEmailAndPassword(info_email, info_password).then(function(result) {
                // window.location.href = "index.html";
                cc.director.loadScene("menu");
            }).catch(function(error) {
                info_email = null;
                info_password = null;
                cc.log("sign in fail");
            });
        }, this );

        // sign up btn
        this.right_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            // auth create user
            var info_email = this.email_node.getComponent(cc.EditBox).string;
            var info_password = this.password_node.getComponent(cc.EditBox).string;
            firebase.auth().createUserWithEmailAndPassword(info_email, info_password).then(function(result){
                var user = result.user;
                cc.log("sign up success");
            }).catch(function(error){
                cc.log("sign up error");
            });
        }, this );

    }

    // update (dt) {}
    sendValue(email,password){
        var ref = firebase.database().ref('test');
        var data = {
            email: email,
            pw: password
        };
        ref.push(data);
    }
}
