import SoundController from "./SoundController";
import Tree from "./Tree";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimberMan extends cc.Component {

    isLeft = false;

    @property(cc.Node)
    tree: cc.Node = null;

    @property(cc.Node)
    ripStone: cc.Node = null;

    manSize = cc.v2(78, 118);
    manScaleY = 1.5;

    private man_posi = {
        left: -150,
        right: 150
    }

    onLoad() {
        this.moveLeft();
    }

    cutTree() {
        let animName = "man_left";
        let animation = this.getComponent(cc.Animation);
        animation.playAdditive(animName);
        this.tree.getComponent(Tree).cut(!this.isLeft);
        SoundController.instance.playCutTree();
    }

    moveLeft() {
        this.ripStone.active = false;
        this.isLeft = true;

        this.node.setPosition(this.man_posi.left, this.node.y, this.node.z);
        this.node.scaleX = Math.abs(this.node.scaleX);

        let animation = this.getComponent(cc.Animation);
        animation.play('idle');

    }

    moveRight() {
        this.ripStone.active = false;
        this.isLeft = false;

        this.node.setPosition(this.man_posi.right, this.node.y, this.node.z);
        this.node.scaleX = -Math.abs(this.node.scaleX);

        let animation = this.getComponent(cc.Animation);
        animation.play('idle');

    }

    rip() {
        this.ripStone.setPosition(this.node.position.x, this.ripStone.position.y);
        this.ripStone.active = true;
        this.node.active = false;

        SoundController.instance.playTimberRip();
    }

    onLeftClick() {
        if (!this.isLeft) {
            this.moveLeft();
        }
        this.cutTree();
    }

    onRightClick() {
        if (this.isLeft) {
            this.moveRight();
        }
        this.cutTree();
    }
}
