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
import { delay, loadResAsync } from "./functions";
import { CardModel } from "./GameController";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    layout = null;
    @property(cc.Prefab)
    card = null;

    cardList: Card[] = [];

    start() {
    }

    initCardListData(listData: Array<CardModel>) {
        for (let index = 0; index < listData.length; index++) {
            const element = listData[index];

            let card = this.cardList[index];
            card.setModel(index, element);
        }
    }

    showCardList(v: boolean) {
        this.cardList.forEach(p => {
            p.node.active = v;
        });
    }

    initCardListAction(dt) {
        let actions = [];
        for (let index = 0; index < 12; index++) {
            actions.push(cc.delayTime(dt));
            actions.push(cc.callFunc(this.addOneCard, this));
        }

        return cc.sequence(actions);
    }

    async initCardList() {
        let p = new Promise((r, j) => {

            let action = this.initCardListAction(0.1);
            let callback = cc.callFunc(() => {
                r();
            });

            this.layout.node.removeAllChildren();
            this.cardList = [];
            this.node.runAction(cc.sequence(action, callback));
        });

        await p.then(() => {
            return true;
        });
    }

    async rotateAllCard() {
        for (let index = 0; this.cardList != null && index < this.cardList.length; index++) {
            const element = this.cardList[index];
            await element.onRotate(0.1);
            await delay(0.3);
            await element.onRotateToBack(0.1);
        }
    }

    addOneCard(): Card {
        let go = cc.instantiate(this.card);
        this.layout.node.addChild(go);
        this.layout.updateLayout();

        let card = go.getComponent(Card);

        this.cardList.push(card);

        return card;
    }

    enabledCardListener(indexes?: Array<number>) {
        let array = indexes || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        array.forEach(p => {
            const card = this.cardList[p];
            card.addListener();
        });
    }

    disableCardListener(indexes?: Array<number>) {
        let array = indexes || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        array.forEach(p => {
            const card = this.cardList[p];
            card.removeListener();
        });
    }

}
