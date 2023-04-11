import Trunk from "./Trunk";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tree extends cc.Component {


    @property(cc.Prefab)
    trunk: cc.Prefab = null;

    minLength = 8;
    trunkArr: Trunk[] = [];

    generate() {

        this.createRoot();
        for (let index = 0; index < this.minLength; index++) {
            this.createNew();
        }
    }

    createRoot() {
        let trunk = cc.instantiate(this.trunk).getComponent(Trunk);
        trunk.create_root();
        this.trunkArr.push(trunk);
    }

    createNew() {
        let dir = this.getRandDir();
        let trunk = cc.instantiate(this.trunk).getComponent(Trunk);

        if (dir == 1) {
            trunk.create_left()
        } else if (dir == 2) {
            trunk.create_right();
        } else {
            trunk.create_mid();
        }
        this.trunkArr.push(trunk);
    }

    cut(fly_left: boolean) {
        let last_trunk = this.trunkArr.shift();
        last_trunk.cut(fly_left);


    }

    tweenTree() {

        for (let index = 0; index < this.trunkArr.length; index++) {
            const trunk = this.trunkArr[index];

        }
    }

    getRandDir() { // min and max included 
        let max = 3, min = 1;
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
