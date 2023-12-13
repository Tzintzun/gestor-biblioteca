
import { nanoid } from "nanoid"
import { Libro } from "./Libro.js";
class Biblioteca{
    __autores = {}
    __editoriales = {}
    __libros = {}


    agregar_libro(datos){
        const isbn = datos.isbn.trim().length === 0? nanoid() : datos.isbn;

        let autor_id = this.checar_autor(datos.autor);
        if(!autor_id){
            autor_id = nanoid();
            this.__autores[autor_id] = datos.autor;
        }

        let editorial_id = this.checar_editorial(datos.editorial);
        if(!editorial_id){
            editorial_id = nanoid();
            this.__editoriales [editorial_id]= datos.editorial;
        }
        const es_digital = datos.digital !== 'Digital'? true: false;

        const libro = new Libro(isbn, datos.titulo, autor_id, datos.edicion, editorial_id, datos.idioma, datos.num_pag, es_digital, datos.saga);
        
        id = nanoid();
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
                if(this.__editoriales[key] === autor){
                    return key;
                }  
            })
        }
        return null;
    }
}

export {Biblioteca};