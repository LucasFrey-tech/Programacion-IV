export class Panel {
    constructor() {
        this.foundPairs = 0;
        this.movements = 0;
        this.docPairs = document.getElementById("Pairs");
        this.docMovements = document.getElementById("Attempts");
    }

    founded() {
        this.foundPairs++;
        this.docPairs.textContent = this.foundPairs;
    }

    attempts() {
        this.movements++;
        this.docMovements.textContent = this.movements;
    }

    setFoundPairs(val) {
        this.foundPairs = val;
        this.docPairs.textContent = val;
    }

    setMovements(val) {
        this.movements = val;
        this.docMovements.textContent = val;
    }

}