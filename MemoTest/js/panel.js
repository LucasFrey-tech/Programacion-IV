/**
 * Representa el Panel de Estadisticas
 */
export class Panel {
    constructor() {
        this.foundPairs = 0;
        this.movements = 0;
        this.docPairs = document.getElementById("Pairs");
        this.docMovements = document.getElementById("Attempts");
    }

    /**
     * Aumenta el contador de Pares Encontrados
     */

    founded() {
        this.foundPairs++;
        this.docPairs.textContent = this.foundPairs;
    }

    /**
     * Aumenta el contador de Intentos
     */

    attempts() {
        this.movements++;
        this.docMovements.textContent = this.movements;
    }

    /**
     * Establece los Pares Encontrados y el texto que lo representa en el documento,
     * con un valor pasado por parametro
     * @param {number} val - Numero que se establece como Pares Encontrados 
     */

    setFoundPairs(val) {
        this.foundPairs = val;
        this.docPairs.textContent = val;
    }

    /**
     * Establece los Intentos y el texto que lo representaen el documento,
     * con un valor pasado por parametro
     * @param {number} val - Numero que se establece como Intentos
     */

    setMovements(val) {
        this.movements = val;
        this.docMovements.textContent = val;
    }

}