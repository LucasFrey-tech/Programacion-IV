export class Carta {
    constructor(imagen) {
        this.face = imagen;
        this.back = "resources/cardIcons/honeycomb-seamless-pattern-hexagon-mosaic-260nw-2529836897.png";
        this.flipped = false;
        this.element = null;
        this.img = null;
    }

    
    flip() {
        this.flipped = !this.flipped;
        this.element.classList.toggle("flipped", this.flipped);
        this.img.src = this.flipped ? this.face : this.back;
    }

    createElement() {
        const card = document.createElement("div");
        card.classList.add("Card");

        const img = document.createElement("img");
        img.src = this.back;

        card.appendChild(img);

        this.element = card;
        this.img = img;

        return card;
    }
}