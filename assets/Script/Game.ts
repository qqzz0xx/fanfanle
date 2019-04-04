import CardContainer from "./CardContainer"
import { gameCtrl } from "./GameController";
import { loadResAsync } from "./functions"

const {ccclass, property} = cc._decorator;

enum GameState {
    None,
    FanPai,
    RESET,
    JiFen
}

@ccclass
export default class Game extends cc.Component {

    @property(CardContainer)
    cardContainer : CardContainer  = null;


    isPlaying = false;

    canFanPaiNum = 3;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        window.game = this;
    }

    start () {
        gameCtrl.genInitData();

        loadResAsync
    }

    async onStartGame() {
        await this.cardContainer.initCardList();
        await this.cardContainer.rotateAllCard();
        this.isPlaying = true;
    }

    update (dt) {

        if (this.isPlaying)
        {


        }
    }
}


