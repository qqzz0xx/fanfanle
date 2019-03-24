// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Layout)
    layout = null;
    @property(cc.Prefab)
    card = null;

    cardList = [];

    start () {
     
    }

    initCardListAction() {
        let actions = [];
        for (let index = 0; index < 12; index++) {
            actions.push(cc.delayTime(0.2));
            actions.push(cc.callFunc(this.addOneCard, this));
        }
        return cc.sequence(actions);
    }

    initCardList() {
        this.layout.node.removeAllChildren();
        this.node.runAction(this.initCardListAction());
    }

    addOneCard() {
        let go = cc.instantiate(this.card);
        this.layout.node.addChild(go);
        this.layout.updateLayout();

        this.cardList.push(go);
    }

}
