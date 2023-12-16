

/*
    Opciones:
        - 1. Listar libros
        
        - 2. Filtrar libros
            - 1. Por Autor
            - 2. Por Editorial
            - 3. Por Saga
        - 3. Agregar Libro
        - 4. Borrar Libro
        - 0. Salir
*/

import { Biblioteca } from "./models/Biblioteca.js";
import {listar_objetos, menu_escoger_filtro, menu_principal, menu_registrar_libro, pausa } from "./view/menu.js";


const main = async () => {
    
    let opcion ;
    const biblioteca = new Biblioteca()
    biblioteca.cargar_datos_biblioteca();
    
    do{
         opcion = await menu_principal();
         switch(opcion){
            case 1:
                
                const opcion_libro = await listar_objetos(biblioteca.libros_array,'libro');
                
                if(opcion_libro !== true){
                    biblioteca.info_libro(opcion_libro);
                }
                await pausa();
                break;
            case 2:
                const opcion_filtro =await menu_escoger_filtro();
                if(opcion_filtro === 0) break;
                let lista_objetos_filtro = [];
                let nombre_filtro = '';
                switch(opcion_filtro){
                    case 1:
                        lista_objetos_filtro = biblioteca.autores_array;
                        nombre_filtro = 'autor';
                        break;
                    case 2:
                        lista_objetos_filtro = biblioteca.editoriales_array;
                        nombre_filtro = 'editorial';
                        break;
                }
                
                const id_opcion_filtro = await listar_objetos(lista_objetos_filtro, nombre_filtro);
                
                if(id_opcion_filtro !== true){
                    const opcion_libro = await listar_objetos(biblioteca.buscar_libros_filtro(id_opcion_filtro,nombre_filtro), 'libro');
                    if(opcion_libro !== true){
                        biblioteca.info_libro(opcion_libro);
                        await pausa();
                    }
                }
                break;
            case 3:
                const respuesta = await menu_registrar_libro();
                biblioteca.agregar_libro(respuesta);
                biblioteca.guardar_datos_biblioteca();
                await pausa();
                break;
         }
         
    }while(opcion !== 0);
}

main();