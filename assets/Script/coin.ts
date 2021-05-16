const {ccclass, property} = cc._decorator;

@ccclass
export default class coin extends cc.Component {

    private cnt: number = 0;

    private isOn: boolean = true;

    private adder: number = 0;

    
    @property(cc.SpriteFrame)
    cionSprite: cc.SpriteFrame = null;

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
                // head hit qbox
                this.adder = 0;
                this.cnt = 0;
                if(this.isOn){
                    let action = cc.sequence( cc.moveBy(0.05,0,5),cc.moveBy(0.05,0,-5) );
                    this.node.runAction(action);
                    this.isOn = false;
                }
            }
        }
        // else this.animation();
    }
    
}
