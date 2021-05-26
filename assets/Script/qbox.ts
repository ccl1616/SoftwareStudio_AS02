const {ccclass, property} = cc._decorator;

@ccclass
export default class qbox extends cc.Component {

    private cnt: number = 0;

    private isOn: boolean = true;

    private adder: number = 0;

    private temp: number = 0;

    // private isCoinOut: boolean = false;

    @property([cc.SpriteFrame])
    public qbox_animation: cc.SpriteFrame[] = [];
    @property(cc.Node)
    gameMgr: cc.Node = null;


    onLoad () {
        this.adder = 1;
    }

    start () {
        this.animation();
    }

    private animation() {
        this.schedule(function(){
            // cnt run 1~4
            // var id = this.cnt % 5;
            this.getComponent(cc.Sprite).spriteFrame = this.qbox_animation[this.cnt];
            if(this.cnt == 4)
                this.cnt = 1;
            else this.cnt += this.adder;
        }, 0.2);
    }
    update (dt) { 
        // this.animation();
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player") {
            if(contact.getWorldManifold().normal.y == -1){
                // cc.log(self.name);
                // head hit qbox
                if(this.isOn){
                    this.isOn = false;
                    this.adder = 0;
                    this.cnt = 0;
                    // shake the box
                    let action = cc.sequence( cc.moveBy(0.05,0,5),cc.moveBy(0.05,0,-5) );
                    this.node.runAction(action);
                    // show the coin
                    var coin = cc.find("coin");
                    this.gameMgr.getComponent("GameMgr").update_coin();
                    this.gameMgr.getComponent("GameMgr").playCoinEffect();
                    let action2 = cc.sequence( cc.moveBy(0.5,0,40),cc.hide());
                    coin.runAction(action2);
                    this.scheduleOnce( function() { coin.destroy(); } , 2);
                    // show with score
                    var score = cc.find("score100");
                    this.gameMgr.getComponent("GameMgr").update_score(100);
                    let action3 = cc.sequence( cc.hide(), cc.moveBy(0.5,0,40), cc.show(), cc.fadeOut(1.0) );
                    score.runAction(action3);
                    this.scheduleOnce( function() { score.destroy(); } , 2);
                }
            }
        }
        // else this.animation();
    }
    
}