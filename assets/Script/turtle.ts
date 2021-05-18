const {ccclass, property} = cc._decorator;

@ccclass
export default class turtle extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.SpriteFrame)
    aliveSprite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    deadSprite: cc.SpriteFrame = null;

    private rebornPos = null;

    private isDead = true;

    private isStepped = false;

    private speed = -180;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    }

    start() {
        this.rebornPos = this.node.position;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        this.isDead = false;
    }

    update(dt) {

        this.animation();
        
    }

    public resetPos() {
        this.node.position = this.rebornPos;
        this.node.scaleX = 1;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "left_wall") {
            
            {
                // cc.log("hit leftBound");
                this.node.scaleX = -1;
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-1*this.speed, 0);
            } 
        } else if(other.node.name == "right_wall" || other.node.name == "tube" ) {
            this.node.scaleX = 1;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        } else if(other.node.name == "Player") {
            // cc.log("x: " + contact.getWorldManifold().normal.x);
            // cc.log("y: " + contact.getWorldManifold().normal.y);
            if(contact.getWorldManifold().normal.y == 1){
                // cc.log("vertical");
                // cc.log("step");
                contact.disabled = true;
                this.speed = 0;
                this.isStepped = true;
                this.scheduleOnce(function() { 
                    if(this.node.scaleX == -1)
                        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(-500, 0);
                    else this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(500, 0);
                    this.scheduleOnce(function() { 
                        self.node.destroy(); 
                    }, 0.2);
                }, 0.1);
            }
            else {
                // cc.log("horizontal or head");
                // minus life
                contact.disabled = true;
            } 
            // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);

        } else if(other.node.name == "hell") {
            this.isDead = true;
        } 
    }
    
    private animation() {
        if(this.isStepped)
            this.getComponent(cc.Sprite).spriteFrame = this.deadSprite;
        else this.getComponent(cc.Sprite).spriteFrame = this.aliveSprite;
    }
}