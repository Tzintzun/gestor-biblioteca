

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
import { listar_libros, menu_principal, menu_registrar_libro, pausa } from "./view/menu.js";


const main = async () => {
    
    let opcion ;
    const biblioteca = new Biblioteca()
    biblioteca.cargar_datos_biblioteca();
    do{
         opcion = await menu_principal();
         switch(opcion){
            case 1:
                
                const opcion = await listar_libros(biblioteca.libros_array);
                
                if(opcion !== true){
                    const libro =  biblioteca.__libros[opcion];
                    console.log('ISBN: '.yellow + libro.isbn);
                    console.log('Titulo: '.yellow + libro.titulo);
                    console.log('Autor: '.yellow + biblioteca.__autores[libro.autor_id]);
                    console.log('Edicion: '.yellow + libro.edicion);
                    console.log('Editorial: '.yellow + biblioteca.__editoriales[libro.editorial_id]);
                    console.log('Idioma: '.yellow + libro.idioma);
                    console.log('N° Paginas: '.yellow + libro.num_pag);
                    console.log('Formato: '.yellow + (libro.es_digital? 'Digital': 'Fisico'));
                }
                await pausa();
                break;
            case 4:
                const respuesta = await menu_registrar_libro();
                biblioteca.agregar_libro(respuesta);
                biblioteca.guardar_datos_biblioteca();
                await pausa();
                break;
         }
         
    }while(opcion !== 0);
}

main();