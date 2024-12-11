import { sequelize } from '../libs/sequelize.js';


async function tienda(categoriaId = 0){ 
    console.log("Categoria seleccionada:", categoriaId); // Verifica el valor recibido
    
    let mangas;
    if (categoriaId === 0) {
        // Si no se pasa un filtro de categoría (categoriaId = 0), traer todos los mangas
        mangas = await sequelize.models.manga.findAll({
            include: sequelize.models.Categoria
        });
    } else {
        // Si se pasa un filtro de categoría, traer solo los mangas que coincidan con la categoría
        mangas = await sequelize.models.manga.findAll({
            include: {
                model: sequelize.models.Categoria,
                where: {
                    id: categoriaId  // Filtrar por id de la categoría en la tabla intermedia
                },
                through: {
                    attributes: [] // No necesitamos atributos adicionales de la tabla intermedia
                }
            }
        });
    }   

    // Obtener todas las categorías
    const categorias = await sequelize.models.Categoria.findAll();  
    
    return { mangas, categorias };  // Devolver mangas y categorías
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
    const searchedManga = await sequelize.models.manga.findByPk(id)
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
    tienda,
    create,
    show,
    update,
    destroy
}