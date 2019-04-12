import CardContainer from "./CardContainer"
import { gameCtrl, CardModel } from "./GameController";
import { loadResAsync } from "./functions"
import Card from "./Card"

const { ccclass, property } = cc._decorator;

enum GameState {
    None,
    FanPai,
    RESET,
    JiFen
}

@ccclass
export default class Game extends cc.Component {

    @property(CardContainer)
    cardContainer: CardContainer = null;

    rotateCards: Card[] = [];

    isPlaying = false;
    canFanPaiNum = 3;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        window.game = this;
    }

    start() {

    }

    async onStartGame() {
        this.isPlaying = false;
        await this.cardContainer.initCardList();
        this.cardContainer.initCardListData(gameCtrl.genInitData());
        await this.cardContainer.rotateAllCard();
        this.cardContainer.enabledCardListener();

        this.isPlaying = true;
    }

    async onRotateCard(card: Card) {
        if (this.isPlaying == false) return;

        this.rotateCards.push(card);
        this.cardContainer.disableCardListener([card.index]);

        if (this.rotateCards.length == this.canFanPaiNum) {
            let indexes = []
            this.rotateCards.forEach(element => {
                indexes.push(element.index);
            });
            let isSame = gameCtrl.checkTheSame(indexes);

            if (!isSame) {

                for (let index = 0; index < this.rotateCards.length; index++) {
                    const element = this.rotateCards[index];
                    await element.onRotateToBack(0.2);
                }

                this.cardContainer.enabledCardListener(indexes);
            }
            else {
                this.cardContainer.disableCardListener(indexes);
            }

            this.rotateCards = [];

        }
    }
}


