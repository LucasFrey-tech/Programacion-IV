export class Carta {
    constructor(imagen) {
        this.face = imagen;
        this.back = '../resources/cardIcons/honeycomb-seamless-pattern-hexagon-mosaic-260nw-2529836897.png'
        this.flipped = false;
        // Al momento de crear el objeto este se crea el elemento que lo contiene
        this.card = this.crearElemento();
    }

    // Funcion para crear el elemento carta
    crearElemento() {
        const div = document.createElement("div");
        div.classList.add("carta");
        div.dataset = this.id;
    
        const img = document.createElement("img");
        img.src = this.face;
        img.style.display = "none";

        // Se agrega al elemento div la imagen correspondiente
        div.appendChild(img);
        // Se espera por un click para voltear la carta
        div.addEventListener("click", () => this.voltear())

        return div;
    }

    // Funcion para voltear la carta 
    voltear() {
        // Se voltea la carta hacia un lado u otro
        this.volteada = !this.volteada;
        // Se selecciona la imagen
        const img = this.elemento.querySelector("img");
        img.style.display = this.volteada ? "block" : "none";
    }
}