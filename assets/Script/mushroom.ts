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


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.bulletMove();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        this.node.position = cc.v2(-10,0);
        this.node.position = this.node.position.addSelf(node.position);
        let action = cc.moveBy(0.2,0,32);
        this.node.runAction(action);
    }

    //make the bullet move from current position
    private bulletMove()
    {
        let speed = 0;

        if(this.node.scaleX > 0)
            speed = 600;
        else
            speed = -600;

        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "leftBound" || other.node.name == "rightBound") {
            self.node.destroy();
        }
    }
}
