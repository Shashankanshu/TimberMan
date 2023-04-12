import TimberMan from "./TimberMan";
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
    gameEnded = false;

    start() {

        this.node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.touch.getLocationX() > cc.winSize.width / 2 ? this.rightClick() : this.leftClick();
        });

        this.generateTree();
    }

    generateTree() {
        this.tree.getComponent(Tree).generate();
    }

    rightClick() {
        this.man.getComponent(TimberMan).onRightClick();
    }

    leftClick() {
        this.man.getComponent(TimberMan).onLeftClick();
    }
}
