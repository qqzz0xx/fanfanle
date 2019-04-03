// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import Card from "./Card"
import functions from "./functions"

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    layout = null;
    @property(cc.Prefab)
    card = null;

    cardList : Card[] = [];

    start() {

    }

    initCardListAction() {
        let actions = [];
        for (let index = 0; index < 12; index++) {
            actions.push(cc.delayTime(0.2));
            actions.push(cc.callFunc(this.addOneCard, this));
        }

        return cc.sequence(actions);
    }

    async initCardList() {
        let p = new Promise((r, j) => {

            let action = this.initCardListAction();
            let callback = cc.callFunc(() => {
                r();
            });

            this.layout.node.removeAllChildren();
            this.cardList = [];
            this.node.runAction(cc.sequence(action, callback));
        });

        await p.then(()=>{
            return true;
        });
    }

    async rotateAllCard() {
        for (let index = 0; this.cardList != null && index < this.cardList.length; index++) {
            const element = this.cardList[index];
            await element.onRotate();
            await functions.delay(300);
            await element.onRotateToBack();
        }
    }

    addOneCard() {
        let go = cc.instantiate(this.card);
        this.layout.node.addChild(go);
        this.layout.updateLayout();

        let card = go.getComponent(Card);

        this.cardList.push(card);
    }

    enabledCardListener() {
        for (let index = 0; this.cardList != null && index < this.cardList.length; index++) {
            const element = this.cardList[index];
        }
    }

}
