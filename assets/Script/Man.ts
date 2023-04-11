
const { ccclass, property } = cc._decorator;

@ccclass
export default class Man extends cc.Component {

    activeMan: cc.Node;
    isLeft = false;

    onload() {
        this.node.getChildByName('left').active = false;
        this.node.getChildByName('left').getChildByName('rip').active = false;

        this.node.getChildByName('right').active = false;
        this.node.getChildByName('right').getChildByName('rip').active = false;

        this.moveLeft();
    }

    cutTree() {
        let animName = this.isLeft ? 'man_left' : 'man_right';
        this.activeMan.getChildByName('man').getComponent(cc.Animation).play(animName);
    }

    moveLeft() {
        this.activeMan = this.node.getChildByName('left');
        this.activeMan.active = true;
        this.activeMan.getChildByName('rip').active = false;

        this.isLeft = true;

        this.node.getChildByName('right').active = false;
    }

    moveRight() {
        this.activeMan = this.node.getChildByName('right');
        this.activeMan.active = true;
        this.activeMan.getChildByName('rip').active = false;

        this.isLeft = false;
        this.node.getChildByName('left').active = false;
    }

    rip() {
        this.activeMan.getChildByName('man').active = false;
        this.activeMan.getChildByName('rip').active = true;
    }
}
