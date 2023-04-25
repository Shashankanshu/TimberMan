import MainGame from "./MainGame";
import TimberMan from "./TimberMan";
import Trunk from "./Trunk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tree extends cc.Component {

    @property(cc.Prefab)
    trunk: cc.Prefab = null;

    @property(cc.Node)
    man: cc.Node = null;

    trunkHeight = 103;
    minLength = 8;
    trunkArr: Trunk[] = [];

    lastDir = 1;

    generate() {
        this.node.removeAllChildren();

        for (let index = 0; index < this.minLength; index++) {
            this.createBranch(index < 3);
        }
    }

    createBranch(mid_branch?: boolean) {

        let pos = cc.v3();
        if (this.trunkArr.length) {
            pos = this.trunkArr[this.trunkArr.length - 1].node.position;
            pos.y += this.trunkHeight;
        }

        let dir = this.getRandDir();
        if (this.lastDir == 1 || this.lastDir == 2)
            dir = 3;

        this.lastDir = dir;

        let trunk = cc.instantiate(this.trunk).getComponent(Trunk);

        if (dir == 1 && !mid_branch) {
            trunk.create_left()
        } else if (dir == 2 && !mid_branch) {
            trunk.create_right();
        } else {
            trunk.create_mid();
        }
        trunk.node.setPosition(pos);

        this.trunkArr.push(trunk);
        this.node.addChild(trunk.node);
    }

    cut(fly_left: boolean) {
        let last_trunk = this.trunkArr.shift();
        last_trunk.cut(fly_left, () => {
            this.node.removeChild(last_trunk.node);
        });

        cc.tween(this.node)
            .delay(0.1)
            .call(() => {
                this.tweenTree();
            })
            .start();
    }

    tweenTree() {
        if (this.trunkArr.length < this.minLength) {
            this.createBranch();
        }
        let callbackCount = 0;
        for (let index = 0; index < this.trunkArr.length; index++) {
            const trunk = this.trunkArr[index];
            cc.tween(trunk.node)
                .by(0.1, { position: cc.v3(0, -this.trunkHeight, 0) })
                .call(() => {
                    ++callbackCount;
                    if (callbackCount >= this.trunkArr.length) {
                        this.checkCollision();
                    }
                })
                .start();
        }
    }

    checkCollision() {

        if (this.node.parent.getComponent(MainGame).gameEnded)
            return;

        let timberMan = this.man.getComponent(TimberMan);
        let timberManPos = this.node.parent.convertToWorldSpaceAR(timberMan.node.position);
        console.log(timberMan.manSize.y * timberMan.manScaleY + timberManPos.y, 'man');


        for (let index = 0; index < this.trunkArr.length; index++) {
            const trunk = this.trunkArr[index];
            if (trunk.hitbox.active) {

                let hitpos = trunk.hitbox.convertToWorldSpaceAR(trunk.hitbox.position);
                // let hitpos = this.node.parent.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(trunk.hitbox.position));

                console.log(hitpos.x, hitpos.y, 'trunk');

                if ((hitpos.y < timberMan.manSize.y * timberMan.manScaleY + timberManPos.y)
                    && (trunk.isLeft === timberMan.isLeft)) {

                    this.node.parent.getComponent(MainGame).gameEnded = true;
                    timberMan.rip();
                    console.log('GameOver');
                }
            }
        }
    }

    getRandDir() { // min and max included 
        let max = 3, min = 1;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
