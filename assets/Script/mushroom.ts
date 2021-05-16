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
export default class green_mushroom extends cc.Component {


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
    }

    public init(node: cc.Node) 
    {
        // this.setInitPos(node);
        // this.bulletMove();
    }
    start() { }

    update (dt) { 
        // this.animation();
    }

    //this function sets the bullet's initial position when it is reused.
    private setInitPos(node: cc.Node)
    {
        this.node.parent = node.parent; // don't mount under the player, otherwise it will change direction when player move
        this.node.position = cc.v2(0,0);
        this.node.position = this.node.position.addSelf(node.position);
        let action2 = cc.sequence(cc.moveBy(0.2,0,33),cc.moveBy(0.2,33,0) );
        this.node.runAction(action2);
        // this.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic;
        // let action = cc.moveBy(0.2,30,0);
        // this.node.runAction(action);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "qbox_m"){
            contact.disabled = true;
            // this.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
        }
    }
    
    onEndContact(contact, self, other) {
        if(other.node.name == "qbox_m"){
            cc.log("leave green mushroom");
        }
    }
}
