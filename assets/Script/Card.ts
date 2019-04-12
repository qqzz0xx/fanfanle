import Game from "./Game";
import { CardModel } from "./GameController";
import { loadResAsync } from "./functions";

const { ccclass, property } = cc._decorator;

export enum CardState{Front, InAction, Back}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    BackCard: cc.Node = null;

    @property(cc.Node)
    Card: cc.Node = null;

    @property(cc.Node)
    EvCard: cc.Node = null;

    index: number;

    model: CardModel = null;

    status = CardState.Back;

    game: Game = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.Card.active = false;
        this.BackCard.active = true;
    }

    start() {
        this.game = window.game;
    }

    async setModel(index: number, model: CardModel) {
        this.index = index;
        this.model = model;


        let label = this.Card.getComponentInChildren(cc.Label);
        label.string = model.num + "," + model.type;
        label.node.color = cc.Color.RED;

        // let p = loadResAsync<cc.SpriteFrame>( "1" );

        // await p.then((res)=>{
        //     this.Card.getComponent(cc.Sprite).spriteFrame = res;
        // });
    }

    addListener() {
        this.EvCard.on('mousedown', this.onClickCard, this);
    }

    removeListener() {
        this.EvCard.off('mousedown',  this.onClickCard, this);
    }

    onClickCard() {
        if (this.status == CardState.Back) {
            this.onRotate(0.1);
        }
        else if (this.status == CardState.Front) {
            this.onRotateToBack(0.1);
        }
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

    async onRotate(dt) {
        let a = this.RotateAction(dt);
        let p = this.playCardAction(a[0], a[1]);
        this.status = CardState.InAction;

        await p.then((result)=>{
            return true;
        });

        this.status = CardState.Front;

        this.game.onRotateCard(this);
    }

    async onRotateToBack(dt) {
        let a = this.RotateToBackAction(dt);
        let p = this.playCardAction(a[0], a[1]);
        this.status = CardState.InAction;

        await p.then((result)=>{
            return true;
        });

        this.status = CardState.Back;
    }

    // update (dt) {}
}
