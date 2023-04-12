import Tree from "./Tree";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TimberMan extends cc.Component {

    activeMan: cc.Node;
    isLeft = false;

    @property(cc.Node)
    tree: cc.Node = null;

    onLoad() {

        this.node.getChildByName('left').active = false;
        this.node.getChildByName('left').getChildByName('rip').active = false;

        this.node.getChildByName('right').active = false;
        this.node.getChildByName('right').getChildByName('rip').active = false;

        this.moveLeft();
        this.updateManOnTree();
    }

    updateManOnTree() {
        this.tree.getComponent(Tree).man = this.activeMan.getChildByName('man');
    }

    cutTree() {
        let animName = this.isLeft ? 'man_left' : 'man_right';
        let animation = this.activeMan.getChildByName('man').getComponent(cc.Animation);
        animation.playAdditive(animName);
        this.tree.getComponent(Tree).cut(!this.isLeft);
    }

    moveLeft() {
        this.activeMan = this.node.getChildByName('left');
        this.activeMan.active = true;
        this.activeMan.getChildByName('rip').active = false;

        this.isLeft = true;

        this.node.getChildByName('right').active = false;
        this.updateManOnTree();

        let animation = this.activeMan.getChildByName('man').getComponent(cc.Animation);
        animation.play('idle');
    }

    moveRight() {
        this.activeMan = this.node.getChildByName('right');
        this.activeMan.active = true;
        this.activeMan.getChildByName('rip').active = false;

        this.isLeft = false;
        this.node.getChildByName('left').active = false;
        this.updateManOnTree();

        let animation = this.activeMan.getChildByName('man').getComponent(cc.Animation);
        animation.play('idle');
    }

    rip() {
        this.activeMan.getChildByName('man').active = false;
        this.activeMan.getChildByName('rip').active = true;
    }

    onLeftClick() {

        // let animation = this.activeMan.getChildByName('man').getComponent(cc.Animation);
        // let animName = this.isLeft ? 'man_left' : 'man_right';
        // if (!animation.getAnimationState(animName).isPlaying) {
        //     if (!this.isLeft) {
        //         this.moveLeft();
        //     }
        //     this.cutTree();
        // }


        if (!this.isLeft) {
            this.moveLeft();
        }
        this.cutTree();
    }

    onRightClick() {
        // let animation = this.activeMan.getChildByName('man').getComponent(cc.Animation);
        // let animName = this.isLeft ? 'man_left' : 'man_right';
        // if (!animation.getAnimationState(animName).isPlaying) {
        //     if (this.isLeft) {
        //         this.moveRight();
        //     }
        //     this.cutTree();
        // }


        if (this.isLeft) {
            this.moveRight();
        }
        this.cutTree();
    }
}
