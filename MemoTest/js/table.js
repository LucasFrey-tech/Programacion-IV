import { Carta } from "./card.js";
import { Panel } from "./panel.js";

export class Tablero {
    constructor(cant){
        this.cant = cant;
        this.deck = []; 
        this.difficulty = document.querySelectorAll(".Difficulty");
        this.table = document.getElementById("Table");
        this.panel = new Panel();
        this.newGame = document.getElementById("New-Beginning");
        this.rest = document.getElementById("Restart");
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
        this.tableFormat();
        this.again();
    }

    setDifficulty(allPictures) {
        this.difficulty.forEach(element => {
            element.addEventListener("click", (Event) => {
                const cantidad = Event.target.value;
                this.cant = Number(cantidad);
                this.setTable(allPictures);
            })
        });
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
        this.table.appendChild(element.createElement());
    }

    setCards() {
        this.deck = this.deck.map(url => new Carta(url));

        this.table.innerHTML = "";

        let flippedCards = [];
        let boardlocked = false;

        this.deck.forEach(carta => {
            const div = carta.createElement();
            this.table.appendChild(div);

            div.addEventListener("click", () => {
                if (boardlocked || carta.flipped) return;
                
                carta.flip();
                flippedCards.push(carta);

                if (flippedCards.length === 2) {
                    const [first, second] = flippedCards;

                    if (first.face === second.face) {
                        flippedCards = [];
                        this.panel.founded();
                        console.log("Pares encontrados: ", this.panel.foundPairs);
                    } else {
                        boardlocked = true;
                        setTimeout(() => {
                            first.flip();
                            second.flip();
                            flippedCards = [];
                            boardlocked = false;
                        }, 1000);
                        this.panel.attempts();
                        console.log("Intentos: ", this.panel.movements);
                    }
                }
            });
        });
    }

    tableFormat(){
        const total = this.deck.length;
        let cols = Math.floor(Math.sqrt(total))
        while (total % cols !== 0) {
            cols--;
        }
        this.table.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; 
    }

    again() {
        this.newGame.addEventListener("click", () => {
            this.panel.setFoundPairs(0);
            this.panel.setMovements(0);
            this.setCards();
            this.tableFormat();
        })
    }
}
