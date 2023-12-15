import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import 'colors'

const guardar_datos = (archivo, data) =>{
    const dir_archivo = path.join(process.env.DB_DIR, archivo);
    try{
        fs.writeFileSync(dir_archivo, data);
    }catch(e){
        console.log(`${'ERROR:'.red} No se pudieron guardar los datos`);
    }
}

const cargar_datos = (archivo) => {
    const dir_archivo = path.join(process.env.DB_DIR, archivo);
    if(!fs.existsSync(dir_archivo)){
        return null;
    }

    const contenido = fs.readFileSync(dir_archivo);
    return JSON.parse(contenido);
}

export {guardar_datos, cargar_datos};

