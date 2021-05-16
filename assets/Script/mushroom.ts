const {ccclass, property} = cc._decorator;

@ccclass
export default class green_mushroom extends cc.Component {
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
            // cc.log(this.is_created);
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