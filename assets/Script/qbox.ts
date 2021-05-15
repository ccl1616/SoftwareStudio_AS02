const {ccclass, property} = cc._decorator;

@ccclass
export default class qbox extends cc.Component {

    private cnt: number = 0;

    @property([cc.SpriteFrame])
    public qbox_animation: cc.SpriteFrame[] = [];

    // onLoad () {}

    start () {
        this.animation();
    }

    animation() {
        this.schedule(function(){
            var id = this.cnt % 4;
            this.getComponent(cc.Sprite).spriteFrame = this.qbox_animation[id];
            if(this.cnt == 3)
                this.cnt = 1;
            else this.cnt += 1;
        }, 0.1);
    }
    update (dt) {
        
    }
}
