import { sequelize } from '../libs/sequelize.js';

async function formulario(){
    const formularios = await sequelize.models.formulario.findAll()
    return formularios
}

async function create(formulario){
    const newFormulario = await sequelize.models.formulario.create({
        nombre: formulario.nombre,
        documento: formulario.documento,
        apellido: formulario.apellido,
        direccion: formulario.direccion,
        telefono: formulario.telefono,
        confirmacionManga: formulario.confirmacionManga
    });
    return newFormulario
}

async function show(id){
    const formulario = await sequelize.models.formulario.findByPk(id)
    return formulario
}

async function update(id, formulario){
    const searchedFormulario = sequelize.models.formulario.findByPk(id)
    if(!searchedFormulario) {
        return false
    }
   const [rowsAffected, [updatedFormulario]] = await sequelize.models.formulario.update({
    nombre: formulario.nombre,
    documento: formulario.documento,
    apellido: formulario.apellido,
    direccion: formulario.direccion,
    telefono: formulario.telefono,
    confirmacionManga: formulario.confirmacionManga
    }, {
        where: {
            id
        },
        returning: true
    })
    return updatedFormulario
}

async function destroy(id) {
    const formulario = await sequelize.models.formulario.findByPk(id);

    if (!formulario) {
        return null;
    }
    await formulario.destroy();
    return formulario;
}


        
export {
    formulario,
    create,
    show,
    update,
    destroy
}
