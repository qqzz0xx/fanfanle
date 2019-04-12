
enum CardType {
    JOKE = 0,
    FANG,
    HUA,
    HONG,
    HEI,
}

enum CardState { None, Front, Back }

class CardModel {
    type: CardType;
    num: number;
    state: CardState;

    constructor();
    constructor(type, num);
    constructor(type?, num?) {
        this.type = type && type || 0;
        this.num = num && num || 0;
    }

    isEqual(card: CardModel) {
        return this.num == card.num && this.type == card.type;
    }

    getCardImageName() {
        let v = this.type * 100 + this.num;
        return v.toString();
    }
}

class GameController {
    cardData: Array<CardModel> = new Array<CardModel>(12);

    randomCard() {
        let type = Math.floor(Math.random() * 4 + 1)
        let num = Math.floor(Math.random() * 13)
        return new CardModel(type, num);
    }

    randomIndex() {
        let array = [];
        for (let index = 0; index < this.cardData.length; index++) {
            const element = this.cardData[index];

            element == null && array.push(index);
        }
        let i = Math.floor(Math.random() * array.length);

        return array[i];
    }

    genInitData() {

        for (let index = 0; index < 4; index++) {
            let card = this.randomCard();
            for (let j = 0; j < 3; j++) {
                let i = this.randomIndex();
                this.cardData[i] = card;
            }

        }

        return this.cardData;

    }

    getBackCardIndexs() {
        let indexes = [];
        for (let index = 0; index < this.cardData.length; index++) {
            const element = this.cardData[index];
            if (element.state == CardState.Back) {
                indexes.push(index);
            }
        }

        return indexes;
    }

    checkTheSame(indexes: Array<number>) {
        if (indexes.length <= 0) return;
        let t = this.cardData[indexes[0]]
        for (let index = 1; index < indexes.length; index++) {
            const element = indexes[index];
            let data = this.cardData[element]
            if (!data.isEqual(t)) {
                return false;
            }
        }

        return true;
    }
}
const gameCtrl = new GameController();
window.gameCtrl = gameCtrl;

export { gameCtrl, CardModel }