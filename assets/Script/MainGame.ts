import Man from "./Man";
import Tree from "./Tree";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainGame extends cc.Component {

    @property(cc.Node)
    man: cc.Node = null;

    @property(cc.Node)
    tree: cc.Node = null;

    @property(cc.Node)
    tut: cc.Node = null;

    @property(cc.Node)
    score_board: cc.Node = null;

    ////
    isLeft = false;


    onLoad() {

        this.generateTree();
    }

    generateTree() {
        this.tree.getComponent(Tree).generate();
    }

    rightClick() {
        if (this.isLeft) {
            this.moveRight();
        } else {
            this.man.getComponent(Man).cutTree();
        }
    }

    leftClick() {
        if (!this.isLeft) {
            this.moveLeft();
        } else {
            this.man.getComponent(Man).cutTree();
        }
    }

    moveLeft() {
        this.man.getComponent(Man).moveLeft();
        this.cut();
    }

    moveRight() {
        this.man.getComponent(Man).moveRight();
        this.cut();
    }

    cut() {
        cc.tween(this.node)
            .delay(0.1)
            .call(() => {
                this.man.getComponent(Man).cutTree();
            })
            .start();
    }
}
