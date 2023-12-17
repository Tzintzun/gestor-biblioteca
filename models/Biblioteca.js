
import { nanoid } from "nanoid"
import { Libro } from "./Libro.js";
import { guardar_datos,cargar_datos } from "../helpers/archivos.js";
class Biblioteca{
    __autores = {};
    __editoriales = {};
    __libros = {};

    constructor(){
        this.filtros =  [this.__libros, this.__autores, this.__editoriales];
    }


    agregar_libro(datos){
        const isbn = datos.isbn.trim().length === 0? nanoid() : datos.isbn;

        let autor_id = this.checar_autor(datos.autor);
        if(!autor_id){
            autor_id = nanoid();
            this.__autores[autor_id] = {
                nombre: datos.autor
            };
        }

        let editorial_id = this.checar_editorial(datos.editorial);
        if(!editorial_id){
            editorial_id = nanoid();
            this.__editoriales [editorial_id]= {
                nombre: datos.editorial
            };
        }
        

        const libro = new Libro(isbn, datos.titulo, autor_id, datos.edicion, datos.formato, datos.idioma, datos.num_pag, es_digital, datos.saga);
        
        const id = nanoid();
        this.__libros[id] = libro;

    }

    

    checar_autor(autor){
        Object.keys(this.__autores).forEach(key =>{
            if(this.__autores[key] === autor){
                return key;
            }  
        })
        return null;
    }
    checar_editorial(editorial){
        if(editorial){
            Object.keys(this.__editoriales).forEach(key =>{
                if(this.__editoriales[key] === editorial){
                    return key;
                }  
            })
        }
        return null;
    }
    cargar_datos_biblioteca(){
        
        const libros = cargar_datos('libros.json') ?? {};
        this.__libros = libros;

        const autores = cargar_datos('autores.json') ?? {};
        this.__autores = autores;

        const editoriales = cargar_datos('editoriales.json') ?? {};
        this.__editoriales = editoriales;
    }

    guardar_datos_biblioteca(){
        guardar_datos('libros.json',JSON.stringify(this.__libros));
        guardar_datos('autores.json',JSON.stringify(this.__autores));
        guardar_datos('editoriales.json',JSON.stringify(this.__editoriales));
    }


    buscar_libros_filtro(id, nombre_filtro){
        let arreglo_libros = [];
        Object.keys(this.__libros).forEach(id_libro => {
            if(this.__libros[id_libro][nombre_filtro+'_id'] === id){
                arreglo_libros.push({
                    id:id_libro,
                    ...this.__libros[id_libro]
                })
            }
        })
        return arreglo_libros;

    }

    info_libro(id){
        const libro =  this.__libros[id];
        console.log('ISBN: '.yellow + libro.isbn);
        console.log('Titulo: '.yellow + libro.nombre);
        console.log('Autor: '.yellow + this.__autores[libro.autor_id]);
        console.log('Edicion: '.yellow + libro.edicion);
        console.log('Editorial: '.yellow + this.__editoriales[libro.editorial_id]);
        console.log('Idioma: '.yellow + libro.idioma);
        console.log('N° Paginas: '.yellow + libro.num_pag);
        console.log('Formato: '.yellow + libro.formato);
    }

    borrar_libro (id){
        delete this.__libros[id];
        guardar_datos('libros.json',JSON.stringify(this.__libros));

    }
    get libros_array(){
        const arreglo = [];

        Object.keys(this.__libros).forEach(libro =>{
            arreglo.push({
                id:libro,
                ...this.__libros[libro]

            });
        })
        return arreglo;
    }
    get autores_array(){
        const arreglo = [];

        Object.keys(this.__autores).forEach(autores =>{
            arreglo.push({
                id:autores,
                nombre: this.__autores[autores]

            });
        })
        return arreglo;
    }
    get editoriales_array(){
        const arreglo = [];

        Object.keys(this.__editoriales).forEach(editorial =>{
            arreglo.push({
                id:editorial,
                nombre: this.__editoriales[editorial]

            });
        })
        return arreglo;
    }
}

export {Biblioteca};