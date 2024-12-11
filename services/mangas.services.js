import { sequelize } from '../libs/sequelize.js';

async function index(){
    const mangas = await sequelize.models.manga.findAll()
    return mangas
}

async function create(manga){
    const newManga = await sequelize.models.manga.create({
        titulo: manga.titulo,
        autor: manga.autor,
        genero: manga.genero,
        volumenes: manga.volumenes,
        fechaPublicacion: manga.fechaPublicacion,
        sinopsis: manga.sinopsis,
        calificacion: manga.calificacion,
        editorial: manga.editorial,
        precio: manga.precio,
        imagen: manga.imagen
    });
    return newManga
}

async function show(id){
    const manga = await sequelize.models.manga.findByPk(id)
    return manga
}

async function update(id, manga){
    const searchedManga = sequelize.models.manga.findByPk(id)
    if(!searchedManga) {
        return false
    }
   const [rowsAffected, [updatedManga]] = await sequelize.models.manga.update({
        titulo: manga.titulo,  
        autor: manga.autor,
        genero: manga.genero,
        volumenes: manga.volumenes,
        fechaPublicacion: manga.fechaPublicacion,
        sinopsis: manga.sinopsis,
        calificacion: manga.calificacion,
        editorial: manga.editorial,
        precio: manga.precio,
        imagen: manga.imagen
    }, {
        where: {
            id
        },
        returning: true
    })
    return updatedManga
}

async function destroy(id) {
    const manga = await sequelize.models.manga.findByPk(id);

    if (!manga) {
        return null;
    }
    await manga.destroy();
    return manga;
}


        
export {
    index,
    create,
    show,
    update,
    destroy
}