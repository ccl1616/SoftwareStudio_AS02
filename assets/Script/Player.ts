const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    @property(cc.SpriteFrame)
    jumpSprite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    groundSprite: cc.SpriteFrame = null;
    @property(cc.Node)
    gameMgr: cc.Node = null;


    private playerSpeed: number = 0;

    private zDown: boolean = false; // key for player to go left

    private xDown: boolean = false; // key for player to go right

    private jDown: boolean = false; // key for player to shoot

    private kDown: boolean = false; // key for player to jump

    private isDead: boolean = false;
    private isDead_pre: boolean = false;

    private onGround: boolean = false;

    private debug: boolean = true;

    private anim = null;

    @property(cc.Node)
    camera: cc.Node = null;

    @property(cc.Node)
    map: cc.Node = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.anim = this.getComponent(cc.Animation);
        this.anim.play('idle');
    }

    onKeyDown(event) {
        // cc.log("Key Down: " + event.keyCode);
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            this.xDown = false;
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            this.zDown = false;
        } else if(event.keyCode == cc.macro.KEY.k) {
            this.kDown = true;
        } 
    }
    
    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z)
            this.zDown = false;
        else if(event.keyCode == cc.macro.KEY.x)
            this.xDown = false;
        else if(event.keyCode == cc.macro.KEY.k){
            this.kDown = false;
        }
        if(this.anim.getAnimationState('walk').isPlaying)
            this.anim.stop('walk');
    }
    
    private playerMovement(dt) {
        this.playerSpeed = 0;
        if(this.isDead) {
            
            /* this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.node.position = cc.v2(200, 62);
            this.isDead = false;
            return; */
            // this.gameMgr.getComponent("GameMgr").playLoseOneEffect();
            
            cc.director.loadScene("stage1");
        }

        if(this.zDown){
            this.playerSpeed = -300;
            this.node.scaleX = -1;
        }
        else if(this.xDown){
            this.playerSpeed = 300;
            this.node.scaleX = 1;
        }
        
        this.node.x += this.playerSpeed * dt;

        if(this.kDown && this.onGround)
            this.jump();
    }    

    private jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        if(this.node.width == 38)
            this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 100000), true);
        else 
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
        // Method II: Change velocity of rigidbody
        // if(this.node.width != 38)
        // this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
    }
    private animation() {
        /*
        if(this.onGround && !this.isDead){
            this.getComponent(cc.Sprite).spriteFrame = this.groundSprite;
        }
        else {
            this.getComponent(cc.Sprite).spriteFrame = this.jumpSprite; 
        } */

        if(!this.anim.getAnimationState('walk').isPlaying){
            if(this.zDown || this.xDown){
                this.anim.play('walk');
            }
            else if(this.kDown)
                this.anim.play('jump');
            else this.anim.play('idle');
        }
        else if(this.kDown)
            this.anim.play('jump');
    }
    
    update(dt) {
        this.playerMovement(dt);
        this.camerafollow();
        this.animation();
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "ground" || other.node.name == "tube" || other.node.name == "cube" || other.node.name == "cube_left") {
            cc.log("Mario hits the ground");
            this.onGround = true;
        } 
        else if(other.node.name == "block") {
            // cc.log( "x:" + contact.getWorldManifold().normal.x );
            // cc.log( "y:" + contact.getWorldManifold().normal.y );
            
            if(contact.getWorldManifold().normal.y != 0){
                // mario from up
                // cc.log("vertical");
                contact.disabled = false;
                this.onGround = true;
            }
            else {
                // mario from left, right
                // cc.log("horizontal");
                contact.disabled = true;
                this.onGround = true;
            } 

            cc.log("Mario hits the block");
            // this.onGround = true;
        } else if(other.node.name == "qbox"){
            cc.log("hit qbox!");
            this.onGround = true;
        } else if(other.node.name == "coin"){
            cc.log("hit coin");
        }
        else if(other.node.name == "bridge"){
            this.onGround = true;
        } else if(other.node.name == "Enemy") {
            cc.log("Mario hits the enemy");
            // this.onGround = true;
            // this.isDead = true;
        } else if(other.node.name == "flower") {
            cc.log("Mario hits the folwer");
            // this.onGround = true;
            if(!this.debug)
                this.isDead = true;
        } else if(other.node.name == "hell" || other.node.name == "left_bond") {
            cc.log("Mario hits hell");
            if(!this.isDead_pre){
                this.isDead_pre = true;
                this.gameMgr.getComponent("GameMgr").playLoseOneEffect();
                this.scheduleOnce(function(){
                    this.isDead = true;
                },2);
            }
            // this.isDead = true;
        }
        else if(other.node.name == "left_wall" || other.node.name == "right_wall") {
            contact.disabled = true;
        }
    }

    camerafollow(){
        // var scene = cc.director.getScene();
        if(this.node.x < 500)
        {
            this.camera.x = 0;
            // this.map.x = 478;
        }
        else if(this.node.x > 1800)
        {
            this.camera.x = 1800;
        }
        else
        {
            this.camera.x = this.node.x - 500;
            //this.map.x = (this.node.x + 400) * 500 / 1600 + 400;
        }
        /*
        if(scene.name == "Stage 1"){
            if(this.node.x < -580)
            {
                this.camera.x = -580;
                this.test_map.x = 478;
            }
            else if(this.node.x > 1580)
            {
                this.camera.x = 1580;
            }
            else
            {
                this.camera.x = this.node.x;
                this.test_map.x = (this.node.x + 490) * 500 / 2410 + 478;
            }
        }
        else if(scene.name == "Stage 2"){
            if(this.node.x < -580)
                this.camera.x = -580;
            else if(this.node.x > 645)
                this.camera.x = 645;
            else
            {
                this.camera.x = this.node.x;
            }
        }*/
    }

}