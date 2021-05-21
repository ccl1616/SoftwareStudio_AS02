const {ccclass, property} = cc._decorator;

@ccclass
export default class green_mushroom extends cc.Component {

    @property([cc.SpriteFrame])
    public mm_animation: cc.SpriteFrame[] = [];

    private speed: number = 0;
    
    private is_first_time: boolean = true;

    @property(cc.Node)
    gameMgr: cc.Node = null;

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
            var player = cc.find("Player");
            this.scheduleOnce(function(){ 
                this.node.destroy(); 
                this.gameMgr.getComponent("GameMgr").playPowerupEffect();
                let action = cc.scaleBy(1, 57/38, 78/52);
                let action2 = cc.scaleBy(10, 38/57, 52/78);
                let action_s = cc.sequence(action, action2);
                player.runAction(action_s);
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