import { Tablero } from "./table.js";

/**
 * Programa Principal
 */

function main (){
    const allPictures = [
        'resources/cardIcons/png/birrete.png',
        'resources/cardIcons/png/calculadora.png',
        'resources/cardIcons/png/carrito-de-compras.png',
        'resources/cardIcons/png/diploma.png',
        'resources/cardIcons/png/globo-terraqueo.png',
        'resources/cardIcons/png/hogar.png',
        'resources/cardIcons/png/lapiz.png',
        'resources/cardIcons/png/libro.png',
        'resources/cardIcons/png/lugar-de-trabajo.png',
        'resources/cardIcons/png/raton.png',
        'resources/cardIcons/png/sol.png',
        'resources/cardIcons/png/taza-de-cafe.png'
    ]
    
    const tablero = new Tablero(6);
    tablero.setDifficulty(allPictures);
    tablero.setTable(allPictures);
}

main();
