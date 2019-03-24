import CardContainer from "./CardContainer"

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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        window.game = this;
    }

    start () {

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


