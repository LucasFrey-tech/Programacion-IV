import { Carta } from "./card.js";

export class Tablero {
    constructor(cant){
        this.cant = cant;
        this.deck = []; 
    }

    setTable(array) {
        this.shuffle(array);
        this.cut();
        console.log("Deck Sin duplicar: ", this.deck);
        this.duplicate();
        console.log("Deck Duplicado", this.deck);
        this.shuffle(this.deck);
        console.log("Deck Barajado", this.deck);
        this.setCards();
    }

    setDifficulty(cant) {
        this.cant = cant;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        this.deck = array;
    }

    cut() {
        this.deck = this.deck.slice(0, this.cant);
    }

    duplicate() {
        this.deck = this.deck.flatMap(elemento => [elemento, elemento]);
    }

    createElement(element) {
        const section = document.getElementById("Table");
        section.appendChild(element.createElement());
    }

    setCards() {
        this.deck = this.deck.map(url => new Carta(url));

        const section = document.getElementById("Table");
        section.innerHTML = "";

        let flippedCards = [];
        let boardlocked = false;

        this.deck.forEach(carta => {
            const div = carta.createElement();
            section.appendChild(div);

            div.addEventListener("click", () => {
                if (boardlocked || carta.flipped) return;
                
                carta.flip();
                flippedCards.push(carta);

                if (flippedCards.length === 2) {
                    const [first, second] = flippedCards;

                    if (first.face === second.face) {
                        flippedCards = [];

                    } else {
                        boardlocked = true;
                        setTimeout(() => {
                            first.flip();
                            second.flip();
                            flippedCards = [];
                            boardlocked = false;
                        }, 1000);
                    }
                }
            });
        });
    }
}
