import { defineMangas } from './mangas.model.js'
import { defineUsers } from './users.model.js'
import { defineFormularios } from './formulario.model.js'
import { defineCategorias } from './categoria.model.js'
import { defineFormularioManga } from './FormularioManga.model.js';


export function defineModels(sequelize){
    const Manga = defineMangas(sequelize);
    const Categoria = defineCategorias(sequelize);
    const User = defineUsers(sequelize);
    const Formulario = defineFormularios(sequelize);
    const FormularioManga = defineFormularioManga(sequelize);


     // Configurar asociaciones
    Manga.belongsToMany(Categoria, { through: 'MangaCategoria' });
    Categoria.belongsToMany(Manga, { through: 'MangaCategoria' });

    Categoria.associate({ Manga });


    Manga.belongsToMany(Formulario, {
        through: FormularioManga, // Usa el modelo explícito si lo tienes
        foreignKey: 'mangaId',
        otherKey: 'formularioId',
    });
    Formulario.belongsToMany(Manga, {
        through: FormularioManga,
        foreignKey: 'formularioId',
        otherKey: 'mangaId',
    });


    // Retornar modelos definidos (opcional, pero útil)
    return {
        Manga,
        User,
        Formulario,
        Categoria,
        FormularioManga
    };
}
