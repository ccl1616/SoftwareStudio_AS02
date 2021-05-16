const {ccclass, property} = cc._decorator;

@ccclass
export default class green_mushroom extends cc.Component {

    @property([cc.SpriteFrame])
    public mm_animation: cc.SpriteFrame[] = [];

    private speed: number = 0;
    
    private is_first_time: boolean = true;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        this.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
    }

    start() { }

    update (dt) { 
        this.node.x += this.speed * dt;
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Player"){
            cc.log("mushroom hits player");
            this.getComponent(cc.Sprite).spriteFrame = this.mm_animation[0];
            this.scheduleOnce(function(){
                let action = cc.fadeOut(0.5);
                this.node.runAction(action);
            },0.3);
            this.scheduleOnce(function(){ 
                this.node.destroy(); 
                var player = cc.find("Player");
                player.setContentSize(57,78); //57, 78
                player.getComponent(cc.PhysicsBoxCollider).size.width = 57;
                player.getComponent(cc.PhysicsBoxCollider).size.height = 78;
                player.position.y = 70;
            } , 1 );
        }
        else if(other.node.name == "ground"){
            if(this.is_first_time){
                this.speed = -200;
                this.is_first_time = false;
            }
        }
        else if(other.node.name == "cube_left"){
            this.speed = 200;
        }
        else if(other.node.name == "cube"){
            this.speed = -200;
        }
    }
    
}