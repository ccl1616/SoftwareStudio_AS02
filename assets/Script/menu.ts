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

    @property(cc.Node)
    life_data: cc.Node = null;
    @property(cc.Node)
    coin_data: cc.Node = null;
    @property(cc.Node)
    score_data: cc.Node = null;

    private email: string;
    private name: string;
    private life_num: number = 0;
    private coin_num: number = 0;
    private score_num: number = 0;

    private dataget: boolean = false;

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
                self.email = user.email;
                self.name = user.displayName;
            }
        });
        var self = this;
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
                    // cc.log("self.life_num: " + self.life_num );
                    self.dataget = true;
                }
            })
        }).catch(e => cc.log("get info error"));

    }

    start () {
        this.user_info_node.getComponent(cc.Label).string = this.name;
        // btn
        this.left_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            this.world1() }, this );
        
        this.right_btn.on( cc.Node.EventType.MOUSE_DOWN, function(event){
            this.world2() }, this );
    }

    update (dt) { 

        if(this.dataget){
            this.life_data.getComponent(cc.Label).string = this.life_num.toString();
            this.coin_data.getComponent(cc.Label).string = this.coin_num.toString();
            this.score_data.getComponent(cc.Label).string = this.score_num.toString();
            this.dataget = false;
        }
    }

}
