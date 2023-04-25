import SoundController from "./SoundController";
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
            if (!this.gameEnded) {
                event.touch.getLocationX() > cc.winSize.width / 2 ? this.rightClick() : this.leftClick();
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.generateTree();

        SoundController.instance.playBGMMain();

    }

    onKeyDown(event) {
        if (!this.gameEnded) {

            switch (event.keyCode) {
                case cc.macro.KEY.right:
                    this.rightClick();
                    break;
                case cc.macro.KEY.left:
                    this.leftClick();
                    break;
            }
        }
    }

    generateTree() {
        this.tree.getComponent(Tree).generate();
    }

    rightClick() {
        this.man.getComponent(TimberMan).onRightClick();
        // this.drawRect();
    }

    leftClick() {
        this.man.getComponent(TimberMan).onLeftClick();
        // this.drawRect();
    }

    drawRect() {
        let ctx = this.node.getComponent(cc.Graphics);
        if (!ctx) {
            ctx = this.node.addComponent(cc.Graphics);
        }
        ctx.clear(true);
        ctx.rect(this.man.x, this.man.y, this.man.width * this.man.scaleX, this.man.height);
        ctx.stroke();
    }
}
