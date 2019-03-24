// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

enum CardState{Front, InAction, Back}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    BackCard = null;
    @property(cc.Node)
    Card = null;
    @property(cc.Node)
    EvCard = null;

    status = CardState.Back;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Card.active = false;
        this.BackCard.active = true;

        this.EvCard.on('mousedown', () => {
            if (this.status == CardState.Back) {
                this.onRotate();
            }
            else if (this.status == CardState.Front) {
                this.onRotateToBack();
            }
        }, this);
    }

    RotateAction(dt: number) {
        let action = cc.sequence(cc.hide(), cc.scaleTo(dt, 0, 1), cc.show(), cc.scaleTo(dt, 1, 1));
        let actionBack = cc.sequence(cc.show(), cc.scaleTo(dt, 0, 1), cc.hide(), cc.scaleTo(dt, 1, 1));
        return [action, actionBack];
    }

    RotateToBackAction(dt: number) {

        let actionBack = cc.sequence(cc.hide(), cc.scaleTo(dt, 0, 1), cc.show(), cc.scaleTo(dt, 1, 1));
        let action = cc.sequence(cc.show(), cc.scaleTo(dt, 0, 1), cc.hide(), cc.scaleTo(dt, 1, 1));
        return [action, actionBack];

    }

    playCardAction(action, actionBack) {
        return new Promise((resolve, reject) => {
            this.Card.active = true;
            this.BackCard.active = true;
            let finishedCallback = cc.callFunc(() => {
                resolve();
            });

            this.Card.runAction(cc.sequence(action, finishedCallback));
            this.BackCard.runAction(cc.sequence(actionBack, finishedCallback));

        });
    }

    async onRotate() {
        let a = this.RotateAction(0.3);
        let p = this.playCardAction(a[0], a[1]);
        this.status = CardState.InAction;

        await p.then((result)=>{
            return true;
        });

        this.status = CardState.Front;
    }

    async onRotateToBack() {
        let a = this.RotateToBackAction(0.3);
        let p = this.playCardAction(a[0], a[1]);
        this.status = CardState.InAction;

        await p.then((result)=>{
            return true;
        });

        this.status = CardState.Back;
    }

    // update (dt) {}
}
