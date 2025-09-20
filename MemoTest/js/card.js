class carta {
    constructor(id, imagen) {
        this.id = id;
        this.imagen = imagen;
        this.volteada = false;

        this.elemento = this.crearElemento();
    }

    crearElemento() {
        const div = document.createElement("div");
        div.classList.add("carta");
        div.dataset.id = this.id;

        const img = document.createElement("img");
        img.src = this.imagen;
        img.style.display = "none";

        div.appendChild(img);

        div.addEventListener("click", () => this.voltear())

        return div;
    }

    voltear() {
        this.volteada = !this.volteada;
        const img = this.elemento.querySelector("img");
        img.style.display = this.volteada ? "block" : "none";
    }
}