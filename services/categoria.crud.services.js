import { sequelize } from '../libs/sequelize.js';

async function index(){
    const categorias = await sequelize.models.Categoria.findAll()
    return categorias
}

async function create(Categoria){
    const newCategoria = await sequelize.models.Categoria.create({
        nombre: Categoria.nombre
    });
    return newCategoria
}

async function show(id){
    const categoria = await sequelize.models.Categoria.findByPk(id)
    return categoria
}

async function update(id, Categoria){
    const searchedCategoria = sequelize.models.Categoria.findByPk(id)
    if(!searchedCategoria) {
        return false
    }
   const [rowsAffected, [updatedCategoria]] = await sequelize.models.Categoria.update({
    nombre: Categoria.nombre
    }, {
        where: {
            id
        },
        returning: true
    })
    return updatedCategoria
}

async function destroy(id) {
    const categoria = await sequelize.models.Categoria.findByPk(id);

    if (!categoria) {
        return null;
    }
    await categoria.destroy();
    return categoria;
}


        
export {
    index,
    create,
    show,
    update,
    destroy
}