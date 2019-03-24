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

    @property(cc.Node)
    BackCard = null;
    @property(cc.Node)
    Card = null;
    @property(cc.Node)
    EvCard = null;

    status = 0;

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.Card.active = false;
        this.BackCard.active = true;

        this.EvCard.on('mousedown', (ev)=>{
            if (this.status == 0)
            {
                this.onRotate();
            }
            else if (this.status == 1)
            {
                this.onRotateToBack();
            }
        }, this);
     }

    
     RotateAction() {
       

        let action = cc.sequence(cc.hide(), cc.scaleTo(0.5, 0, 1), cc.show(), cc.scaleTo(0.5, 1, 1));
        let actionBack = cc.sequence(cc.show(), cc.scaleTo(0.5, 0, 1), cc.hide(), cc.scaleTo(0.5, 1, 1));
        return [action, actionBack];

    }

    RotateToBackAction() {

        let actionBack = cc.sequence(cc.hide(), cc.scaleTo(0.5, 0, 1), cc.show(), cc.scaleTo(0.5, 1, 1));
        let action = cc.sequence(cc.show(), cc.scaleTo(0.5, 0, 1), cc.hide(), cc.scaleTo(0.5, 1, 1));
        return [action, actionBack];

    }

    onRotate() {
        this.Card.active = true;
        this.BackCard.active = true;

        let a = this.RotateAction();
        this.Card.runAction(a[0]);
        this.BackCard.runAction(a[1]);

        this.status = 1;
    }

    onRotateToBack() {
        this.Card.active = true;
        this.BackCard.active = true;

        let a = this.RotateToBackAction();
        this.Card.runAction(a[0]);
        this.BackCard.runAction(a[1]);

        this.status = 0;
    }

    // update (dt) {}
}
