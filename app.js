

/*
    Opciones:
        - 1. Listar libros
        - 2. Listar Autores
        - 3. Filtrar libros
            - 1. Por Autor
            - 2. Por Editorial
            - 3. Por Saga
        - 4. Agregar Libro
        - 5. Borrar Libro
        - 0. Salir
*/

import { Biblioteca } from "./models/Biblioteca.js";
import { menu_principal, menu_registrar_libro, pausa } from "./view/menu.js";

const main = async () => {
    
    let opcion ;
    const biblioteca = new Biblioteca()
    do{
         opcion = await menu_principal();

         switch(opcion){
            case 1:
                console.log(biblioteca.__libros);
                await pausa();
                break;
            case 4:
                const respuesta = await menu_registrar_libro();
                biblioteca.agregar_libro(respuesta);
                await pausa();
                break;
         }
         
    }while(opcion !== 0);
}

main();