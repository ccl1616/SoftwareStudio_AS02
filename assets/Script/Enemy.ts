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
export default class Enemy extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.SpriteFrame)
    aliveSprite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    deadSprite: cc.SpriteFrame = null;
    @property(cc.Node)
    gameMgr: cc.Node = null;

    private rebornPos = null;

    private isDead = true;

    private isStepped = false;

    private speed = -200;

    private isTouched = false;

    private anim = null;
    private animateState = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // this.anim = this.getComponent(cc.Animation);
        // this.anim.play('goomba');
    }

    start() {
        this.rebornPos = this.node.position;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        this.isDead = false;
    }

    update(dt) {
        this.animation();
        if(this.isDead) {
            this.resetPos();
            this.isDead = false;
            this.isStepped = false;
            this.isTouched = false;
            this.speed = -200;
        }
    }

    public resetPos() {
        this.node.position = this.rebornPos;
        this.node.scaleX = 1;
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "left_wall") {
            /*
            this.node.scaleX = -1;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(200, 0); */
            this.isDead = true;
        } else if(other.node.name == "block" || other.node.name == "tube") {
            
            contact.disabled = true;
            // cc.log("Enemy hits the block");
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        } else if(other.node.name == "Player") {
            // cc.log("x: " + contact.getWorldManifold().normal.x);
            // cc.log("y: " + contact.getWorldManifold().normal.y);
            if(contact.getWorldManifold().normal.y == 1){
                // cc.log("vertical");
                // cc.log("step");
                this.speed = 0;
                contact.disabled = true;
                this.isStepped = true;
                this.gameMgr.getComponent("GameMgr").playKickEffect();
                this.gameMgr.getComponent("GameMgr").update_score(500);
                this.scheduleOnce(function() { 
                    self.node.destroy(); 
                    cc.log("killed"); 
                }, 0.5);
            }
            else {
                // horizontal
                // minus life @ player
                if(!this.isTouched){
                    this.isTouched = true;
                    contact.disabled = true;
                    this.gameMgr.getComponent("GameMgr").playPowerdownEffect();
                    this.gameMgr.getComponent("GameMgr").update_life(-1);
                }
            } 
            // this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);

        } else if(other.node.name == "hell") {
            this.isDead = true;
        } else if(other.node.name == "ground") {
            this.node.scaleX = 1;
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.speed, 0);
        } 
    }
    onEndContact(contact, self, other) {
        if(other.node.name == "bridge") {
          self.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        }
    }
    private animation() {
        if(this.isStepped){
            this.getComponent(cc.Animation).play('goomba_stepped');
            // this.getComponent(cc.Sprite).spriteFrame = this.deadSprite;
        }
        else {
            this.getComponent(cc.Sprite).spriteFrame = this.aliveSprite;
        }
    }

}
