const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component 
{
    /* @property(cc.Prefab)
    private bulletPrefab: cc.Prefab = null;*/

    private playerSpeed: number = 0;

    private zDown: boolean = false; // key for player to go left

    private xDown: boolean = false; // key for player to go right

    private jDown: boolean = false; // key for player to shoot

    private kDown: boolean = false; // key for player to jump

    private isDead: boolean = false;

    private onGround: boolean = false;

    @property(cc.Node)
    camera: cc.Node = null;

    @property(cc.Node)
    map: cc.Node = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;        	
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event) {
        cc.log("Key Down: " + event.keyCode);
        if(event.keyCode == cc.macro.KEY.z) {
            this.zDown = true;
            this.xDown = false;
        } else if(event.keyCode == cc.macro.KEY.x) {
            this.xDown = true;
            this.zDown = false;
        } else if(event.keyCode == cc.macro.KEY.k) {
            this.kDown = true;
        } 
        /* else if(event.keyCode == cc.KEY.j) {
            this.jDown = true;
            this.createBullet();
        }*/
    }
    
    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.z)
            this.zDown = false;
        else if(event.keyCode == cc.macro.KEY.x)
            this.xDown = false;
        /* else if(event.keyCode == cc.KEY.j)
            this.jDown = false; */
        else if(event.keyCode == cc.macro.KEY.k)
            this.kDown = false;
    }
    
    private playerMovement(dt) {
        this.playerSpeed = 0;
        if(this.isDead) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.node.position = cc.v2(200, 62);
            this.isDead = false;
            return;
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
        this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(0, 100000), true);

        // Method II: Change velocity of rigidbody
        // this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1500);
    }
    /*
    private createBullet() {
        let bullet = cc.instantiate(this.bulletPrefab);
        bullet.getComponent('Bullet_ans').init(this.node);
    }*/
    
    update(dt) {
        this.playerMovement(dt);
        this.camerafollow();
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "ground") {
            cc.log("Mario hits the ground");
            this.onGround = true;
        } 
        else if(other.node.name == "block" || other.node.name == "tube") {
            cc.log( "x:" + contact.getWorldManifold().normal.x );
            cc.log( "y:" + contact.getWorldManifold().normal.y );
            
            if(contact.getWorldManifold().normal.y <= -0.9){
                // mario from up
                cc.log("vertical");
                contact.disabled = false;
                this.onGround = true;
            }
            else {
                // mario from left, right
                cc.log("horizontal");
                contact.disabled = true;
                this.onGround = true;
            } 

            cc.log("Mario hits the block");
            // this.onGround = true;
        } else if(other.node.name == "enemy") {
            cc.log("Mario hits the enemy");
            this.isDead = true;
        } else if(other.node.name == "hell" || other.node.name == "left_wall") {
            cc.log("Mario hits the hell");
            this.isDead = true;
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