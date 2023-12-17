

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
import {listar_objetos, menu_continuar, menu_escoger_filtro, menu_principal, menu_registrar_libro, pausa } from "./view/menu.js";


const main = async () => {
    
    let opcion;
    let opcion_libro
    const biblioteca = new Biblioteca()
    biblioteca.cargar_datos_biblioteca();
    
    do{
         opcion = await menu_principal();
         switch(opcion){
            case 1:
                
                opcion_libro = await listar_objetos(biblioteca.libros_array,'libro');
                
                if(opcion_libro !== 0){
                    biblioteca.info_libro(opcion_libro);
                }
                await pausa();
                break;
            case 2:
                let opcion_filtro;
                let id_opcion_filtro;
                escoger_filtro: do{
                    opcion_filtro =await menu_escoger_filtro();
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

                    
                    lista_objetos_filtro: do{
                        id_opcion_filtro = await listar_objetos(lista_objetos_filtro, nombre_filtro);
                        
                        if(id_opcion_filtro === 0) {
                            console.clear();
                            continue escoger_filtro;
                        }
                        let continuar = 0;
                        do {
                            console.clear();
                            opcion_libro = await listar_objetos(biblioteca.buscar_libros_filtro(id_opcion_filtro,nombre_filtro), 'libro');
                            if(opcion_libro === 0) {
                                console.clear();
                                continue lista_objetos_filtro;
                            }
                            biblioteca.info_libro(opcion_libro);

                            continuar = await menu_continuar();
                        }while(continuar === 0);
                        await pausa();
                    }while(opcion_libro === 0);  
                    
                }while(id_opcion_filtro === 0);
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