
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

    @property(cc.Node)
    hitbox: cc.Node = null;

    hitbox_offset = cc.v2(131, 20);
    anchor_offset = 0.21;
    isLeft = false;

    create_left() {
        this.node.anchorX = 1 - this.anchor_offset;
        this.node.getComponent(cc.Sprite).spriteFrame = this.trunk_left;
        this.hitbox.active = true;
        this.hitbox.setPosition(-this.hitbox_offset.x, this.hitbox_offset.y);
    }

    create_right() {
        this.node.anchorX = this.anchor_offset;
        this.node.getComponent(cc.Sprite).spriteFrame = this.trunk_right;
        this.hitbox.active = true;
        this.hitbox.setPosition(this.hitbox_offset.x, this.hitbox_offset.y);
    }

    create_mid() {
        this.node.anchorX = 0.5;
        this.node.getComponent(cc.Sprite).spriteFrame = this.trunk;
        this.hitbox.active = false;
    }

    cut(fly_left: boolean, callback: Function) {
        let flypos = 400;
        let pos = fly_left ? -flypos : flypos;

        cc.tween(this.node)
            .delay(0.1)
            .by(0.1, { position: cc.v3(pos, 0, 0) })
            .call(() => {
                callback();
            })
            .start();
    }
}