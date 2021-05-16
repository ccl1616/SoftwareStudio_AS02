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
export default class mushroom extends cc.Component {

    private speed: number = 100;
    public is_created: boolean = false;


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;         
    }

    update (dt) {
        if(this.is_created) {
            this.node.x += this.speed * dt;
        }
    }

    public init(node: cc.Node) {
        this.mushroomMove();
    }

    mushroomMove() {
        
        var moveDir = cc.moveBy(1, 0, 32);
        this.node.runAction(moveDir);
        
        this.scheduleOnce(()=>{
            this.getComponent(cc.RigidBody).type = 2;
            this.is_created = true;
        }, 1);
        
    }

    onBeginContact(contact, self, other) {
        if(!this.is_created){
            return;
        }
        if(other.node.name == "worldRange") {
            console.log(this.node.name + " is destroy");
            this.node.destroy();
        } else if(other.node.name == "player") {
            this.node.destroy();
        }
    }


}
