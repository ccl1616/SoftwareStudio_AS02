const {ccclass, property} = cc._decorator;

@ccclass
export default class qbox_m extends cc.Component {

    private cnt: number = 0;

    private isOn: boolean = true;

    private adder: number = 0;

    @property([cc.SpriteFrame])
    public qbox_animation: cc.SpriteFrame[] = [];

    @property(cc.Prefab)
    private mushroomPrefab: cc.Prefab = null;

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
                    this.adder = 0;
                    this.cnt = 0;
                    this.isOn = false;
                    
                    var mm = cc.find("green_mushroom");
                    let action2 = cc.sequence(cc.moveBy(0.2,0,33),cc.moveBy(0.2,33,0) );
                    mm.runAction(action2);
                    // mm.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                    this.scheduleOnce( function() { 
                        cc.find("green_mushroom").getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
                    } , 0.1);
                }
            }
        }
        else if(other.node.name == "green_mushroom"){
            cc.log("hit green !")
        }
        // else this.animation();
    }

    private createMushroom() {
        let mm = cc.instantiate(this.mushroomPrefab);
        // cc.log(mm);
        mm.getComponent('mushroom').init(this.node);
    }
    
}