import MainGame from "./MainGame";
import Trunk from "./Trunk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tree extends cc.Component {

    @property(cc.Prefab)
    trunk: cc.Prefab = null;

    man: cc.Node;

    trunkHeight = 103;
    minLength = 8;
    trunkArr: Trunk[] = [];

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
        for (let index = 0; index < this.trunkArr.length; index++) {
            const trunk = this.trunkArr[index];
            cc.tween(trunk.node)
                .by(0.1, { position: cc.v3(0, -this.trunkHeight, 0) })
                .start();
        }
        this.checkCollision();
    }

    checkCollision() {
        if (this.node.parent.getComponent(MainGame).gameEnded)
            return;

        for (let index = 0; index < this.trunkArr.length; index++) {
            const trunk = this.trunkArr[index];
            let hitbox = trunk.hitbox.getContentSize();
            let hitpos = trunk.hitbox.convertToWorldSpaceAR(trunk.hitbox.position);

            let manSize = this.man.getContentSize();
            let manpos = this.man.convertToWorldSpaceAR(this.man.position);

            if (cc.Intersection.rectRect(cc.rect(hitpos.x, hitpos.y, hitbox.width, hitbox.height),
                cc.rect(manpos.x, manpos.y, manSize.width, manSize.height))) {

                // if (cc.Intersection.rectRect(cc.rect(trunk.hitbox.x, trunk.hitbox.y, hitbox.width, hitbox.height),
                //     cc.rect(this.man.x, this.man.y, manSize.width, manSize.height))) {


                this.node.parent.getComponent(MainGame).gameEnded = true;
                // this.man.getComponent(Man).rip();
                console.log('GameOver');

                break;
            }
        }
    }

    getRandDir() { // min and max included 
        let max = 3, min = 1;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
