import inquirer from 'inquirer';


const opciones_menu_principal = [
    {
        value: 1,
        name: "Listar libros"
    },
    {
        value: 2,
        name: "Filtrar libros"
    },
    {
        value: 3,
        name: "Agregar Libro"
    },
    {
        value: 4,
        name: "Borrar Libro"
    },
    {
        value: 0,
        name: "Salir"
    },
]

const filtros =[
    {
        value: 1,
        name: 'Autor',
    },
    {
        value: 2,
        name: 'Editorial'
    },
    {
        value: 0,
        name: "Salir"
    }
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
        name: 'formato',
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

const menu_escoger_filtro = async()=>{
    const {filtro} = await inquirer.prompt({
        type: 'rawlist',
        name: 'filtro',
        choices: filtros
    })

    return filtro;

}
const listar_objetos = async (objetos, tipo_objeto) =>{
    
    const choices =objetos.map((objeto, i) => {
        return {
            value: objeto.id,
            name: `${ ((i+1)+'.').green } ` + objeto.nombre
        }
    });
    choices.push({
        value: 0,
        name:`${'0.'.green} Regresar`
    })

    const {opcion} = await inquirer.prompt({
        type: 'list',
        name: 'opcion',
        message: `Que ${tipo_objeto} quieres consultar?`,
        choices

    });
    return opcion;
}


const menu_continuar = async () => {
    const {opcion} = await inquirer.prompt({
        type: 'list',
        name: 'opcion',
        choices: [
            {
                value: 0,
                name: 'Regresar'
            },
            {
                value: 1,
                name: 'Continuar'
            }
        ]
    });
    return opcion;
}

const confirmacion = async (message) => {
    const {respuesta} = await inquirer.prompt({
        message,
        type: 'confirm',
        name: 'respuesta'
    });
    return respuesta;
}


export {menu_principal, pausa, menu_registrar_libro, listar_objetos,menu_escoger_filtro, menu_continuar,confirmacion}