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

    private debug: boolean = true;

    private playerSpeed: number = 0;

    private zDown: boolean = false; // key for player to go left

    private xDown: boolean = false; // key for player to go right

    private jDown: boolean = false; // key for player to shoot

    private kDown: boolean = false; // key for player to jump

    private isDead: boolean = false;

    private isDead_pre: boolean = false;

    private onGround: boolean = false;

    private anim = null;
    private animateState = null;

    private big_mario: boolean = false;

    private levelclear: boolean = false;

    @property(cc.Node)
    camera: cc.Node = null;


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
        // if(this.anim.getAnimationState('walk').isPlaying)
        //     this.anim.stop('walk');
    }
    
    private playerMovement(dt) {
        this.playerSpeed = 0;
        if(this.isDead) {
            
            /* this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.node.position = cc.v2(200, 62);
            this.isDead = false;
            return; */
            // this.gameMgr.getComponent("GameMgr").playLoseOneEffect();
            this.scheduleOnce(()=>{
                cc.director.loadScene("stage1");
            },2);
        }

        else if(this.zDown && !this.levelclear){
            this.playerSpeed = -300;
            this.node.scaleX = -1;
        }
        else if(this.xDown && !this.levelclear){
            this.playerSpeed = 300;
            this.node.scaleX = 1;
        }
        else if(this.kDown && this.onGround && !this.levelclear)
            this.jump();
        this.node.x += this.playerSpeed * dt;
    }    

    private jump() {
        this.onGround = false;

        // Method I: Apply Force to rigidbody
        /*
        if(this.node.width == 38)
            this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 100000), true);
        else 
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
        */
        // Method II: Change velocity of rigidbody
        if(this.node.width == 38)
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1000);
        else 
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
    }
    private animation() {
        if(!this.isDead){
            if(!this.anim.getAnimationState('jump').isPlaying){
                if(this.kDown)
                    this.animateState = this.anim.play('jump');
                else if(this.zDown || this.xDown){
                    if(this.animateState == null || this.animateState.name != 'walk')
                        this.animateState = this.anim.play('walk');
                }
                else{
                    if(this.animateState == null || this.animateState.name != 'idle')
                        this.animateState = this.anim.play('idle');
                }
            }
        }
    }
    
    update(dt) {
        this.playerMovement(dt);
        this.camerafollow();
        this.animation();
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "ground" || other.node.name == "tube" || other.node.name == "cube" || other.node.name == "cube_left") {
            // cc.log("Mario hits the ground");
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
            if(contact.getWorldManifold().normal.y == 1){
                other.node.speed = 0;
                // this.die();
            }
            // else minus life
        } else if(other.node.name == "green_mushroom"){
            cc.log("hit green_mushroom");
            if(!this.big_mario){
                this.scheduleOnce(function(){
                    this.gameMgr.getComponent("GameMgr").playPowerupEffect();
                    this.big_mario = true;
                    let action = cc.scaleBy(1, 48/38, 66/52);
                    this.node.runAction(action);
                },1);
                this.scheduleOnce(function(){
                    this.gameMgr.getComponent("GameMgr").playPowerdownEffect();
                    let action = cc.scaleBy(1, 38/48, 52/66);
                    this.node.runAction(action);
                },6);
            }
        } else if(other.node.name == "flower") {
            cc.log("Mario hits the folwer");
            this.die();
        } else if(other.node.name == "flag_collider") {
            cc.log("Mario hits flag");
            this.levelclear = true;
            this.gameMgr.getComponent("GameMgr").playLevelclearEffect();
            this.scheduleOnce(function(){
                cc.director.loadScene("menu");
            },3.5);
        } else if(other.node.name == "hell" || other.node.name == "left_bond") {
            cc.log("Mario hits hell");
            this.die();
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
    die(){
        if(!this.isDead_pre){
            this.isDead_pre = true;
            this.gameMgr.getComponent("GameMgr").playLoseOneEffect();
            this.gameMgr.getComponent("GameMgr").update_life(-1);
            this.isDead = true;
        }
    }

}