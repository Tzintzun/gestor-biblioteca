import inquirer from 'inquirer';


const opciones_menu_principal = [
    {
        value: 1,
        name: "Listar libros"
    },
    {
        value: 2,
        name: "Listar Autores"
    },
    {
        value: 3,
        name: "Filtrar libros"
    },
    {
        value: 4,
        name: "Agregar Libro"
    },
    {
        value: 5,
        name: "Borrar Libro"
    },
    {
        value: 0,
        name: "Salir"
    },
]

const menu_principal = async () => {
    console.clear();
    const respuesta = await inquirer.prompt({
        type: 'list',
        name: 'opcion',
        message: '¿Qué quieres hacer?',
        choices: opciones_menu_principal,

    });
    return respuesta.opcion;
    //return respuesta;
}


const preguntas = [
    {
        type: 'input',
        name: 'isbn',
        message: 'ISBN: '
    },
    {
        type: 'input',
        name: 'titulo',
        message: 'Titulo: ',
        validate(value){
            if(value.trim().length === 0){
                return 'Porfavor ingresa el titulo del libro';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Autor: ',
        validate(value){
            if(value.trim().length === 0){
                return 'Porfavor ingresa el autor del libro';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'edicion',
        message: 'Edicion: ',
        default(){return null}
    },
    {
        type: 'input',
        name: 'editorial',
        message: 'Editorial: ',
        default(){return null}
    },
    {
        type: 'input',
        name: 'idioma',
        message: 'Idioma: ',
        default(){return null}
    },
    {
        type: 'number',
        name: 'num_pag',
        message: 'Número de paginas: '
    },
    {
        type: 'rawlist',
        name: 'digital',
        message: '¿Que tipo de libro es?',
        choices: ['Digital', 'Fisico']
    },
    {
        type: 'input',
        name: 'saga',
        message: 'Serie: ',
        default(){
            return null;
        }
    },
    
]
const menu_registrar_libro = async() =>{
    return await inquirer.prompt(preguntas);
}

const pausa = async () => {
    const respuesta = await inquirer.prompt({
        type: 'input',
        name: 'pausa',
        message: 'Presiona ENTER para continuar'
    });
}


export {menu_principal, pausa, menu_registrar_libro}