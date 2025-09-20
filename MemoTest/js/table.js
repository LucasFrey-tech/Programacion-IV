import { Carta } from "./card";

export class Tablero {
    constructor(cant){
        this.cant = cant;
        this.deck = []; 
    }

    setTable(array) {
        this.shuffle(array);
        this.duplicate();
        this.shuffle(this.deck);
        this.setCards();
    }

    addCard() {
        let section = document.getElementById("Table");
        this.deck.forEach(element => {
            section.appendChild(element);
        });
    }

    setDifficulty(cant) {
        this.cant = cant;
    }

    shuffle(array) {
        for (let i= array.lenght - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        this.deck = this.deck.slice(0, this.cant);
    }

    duplicate() {
        this.array = this.array.flatmap(elemento => [elemento, elemento]);
    }

    setCards() {
        this.deck = this.deck.map(url => new Carta(url));
    }
}
