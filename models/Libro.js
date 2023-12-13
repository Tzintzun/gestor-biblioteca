

class Libro{
    isbn = '';
    titulo = '';
    autor_id = '';
    edicion = '';
    editorial_id = '';
    idioma='';
    num_pag = 0;
    es_digital=false;
    saga_id = '';


    constructor(isbn , titulo, author_id, edicion, editorial_id, idioma, num_pag, es_digital = false, saga ){
        
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor_id = author_id;
        this.edicion = edicion;
        this.editorial_id = editorial_id;
        this.idioma = idioma;
        this.num_pag = num_pag;
        this.es_digital = es_digital;
        this.saga_id = saga;
    }
}

export {Libro}