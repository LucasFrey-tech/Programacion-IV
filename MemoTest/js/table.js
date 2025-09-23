import { Carta } from "./card.js";
import { Panel } from "./panel.js";

/**
 * Representa el Tablero donde se encuentra el MemoTest y la Estadistica del juego
 */

export class Tablero {

    /**
     * @param {number} cant - La cantidad de Pares a Encontrar
     */

    constructor(cant){
        this.cant = cant;
        this.deck = []; 
        this.difficulty = document.querySelectorAll(".Difficulty");
        this.table = document.getElementById("Table");
        this.panel = new Panel();
        this.newGame = document.getElementById("New-Beginning");
        this.rest = document.getElementById("Restart");
    }

    /**
     * Se encarga de Establecer el Tablero, llamando a las siguientes funciones:
     * shuffle, cut, duplicate, shuffle, setCards, tableFormat y again.
     * @param {array} array - Todas las imagenes que puede tomar una carta
     */

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
        this.again(array);
    }

    /**
     * Establece la Dificultad del juego a través de los botones Normal y Dificil.
     * Reestablece las Estadisticas.
     * @param {string} allPictures - Todas las Imagenes posibles que puede ser una carta 
     */
    setDifficulty(allPictures) {
        this.difficulty.forEach(element => {
            element.addEventListener("click", (Event) => {
                const cantidad = Event.target.value;
                this.cant = Number(cantidad);
                this.setTable(allPictures);
                this.panel.setFoundPairs(0);
                this.panel.setMovements(0);
            })
        });
    }

    /**
     * Baraja todas las imagenes (todavia no son cartas).
     * @param {string} array - Todas las Imagenes posibles que puede ser una carta
     */
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        this.deck = array;
    }

    /**
     * Divide la Baraja segun la cantidad de Pares a Encontrar (Dificultad)
     */
    cut() {
        this.deck = this.deck.slice(0, this.cant);
    }

    /**
     * Segun la cantidad de pares a encontrar Duplica las Cartas
     */
    duplicate() {
        this.deck = this.deck.flatMap(elemento => [elemento, elemento]);
    }

    /**
     * Establece las Cartas, cada imagen pasa a ser una Carta.
     * Se guardan las Cartas que coincidan y se contabiliza.
     * Sino, se contabiliza los intentos.
     */

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

    /**
     * Le da Formato al Tablero, según la cantidad de cartas, para que quede lo mas
     * cuadrado posible
     */

    tableFormat(){
        const total = this.deck.length;
        let cols = Math.floor(Math.sqrt(total))
        while (total % cols !== 0) {
            cols--;
        }
        this.table.style.gridTemplateColumns = `repeat(${cols}, 1fr)`; 
    }

    /**
     * Se encarga de Iniciar un Nuevo Juego, si se hace click al boton.
     * @param {string} allPictures - Todas las Imagenes Posibles que pueden ser una Carta
     */

    again(allPictures) {
        this.newGame.addEventListener("click", () => {
            this.panel.setFoundPairs(0);
            this.panel.setMovements(0);
            this.setCards();
            this.setTable([...allPictures])
        })
    }
}
