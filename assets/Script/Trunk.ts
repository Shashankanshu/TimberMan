
const { ccclass, property } = cc._decorator;

@ccclass
export default class Trunk extends cc.Component {

    @property(cc.SpriteFrame)
    trunk_left: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    trunk_right: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    trunk: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    root: cc.SpriteFrame = null;

    anchor_offset = 0.21;
    isLeft = false;

    create_left() {
        this.node.anchorX = 1 - this.anchor_offset;
        this.node.getComponent(cc.Sprite).spriteFrame = this.trunk_left;
    }

    create_right() {
        this.node.anchorX = this.anchor_offset;
        this.node.getComponent(cc.Sprite).spriteFrame = this.trunk_right;
    }

    create_mid() {
        this.node.anchorX = 0.5;
        this.node.getComponent(cc.Sprite).spriteFrame = this.trunk;
    }

    create_root() {
        this.node.anchorX = 0.5;
        this.node.getComponent(cc.Sprite).spriteFrame = this.root;
    }

    cut(fly_left: boolean) {
        if (fly_left) {

            cc.tween(this.node.position)
                .to(0.1, { x: -500 }, { easing: "sineOutIn" })
                .start();
        }
        else {

            cc.tween(this.node.position)
                .to(0.1, { x: 500 }, { easing: "sineOutIn" })
                .start();

        }
    }
}