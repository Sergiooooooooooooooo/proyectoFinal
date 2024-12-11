import { defineCategorias } from '../db/models/categoria.model.js';
import { sequelize } from '../db';  // Importa correctamente tu instancia de Sequelize
import Manga from '../db/models/manga.model.js'; // Importa el modelo Manga

// Inicializa el modelo Categoria
const Categoria = defineCategorias(sequelize);

// Consultar mangas de una categoría
export const getMangasByCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id, { include: Manga });
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(categoria.Mangas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener mangas por categoría', error: error.message });
    }
};

// Consultar categorías de un manga
export const getCategoriasByManga = async (req, res) => {
    try {
        const { id } = req.params;
        const manga = await Manga.findByPk(id, { include: Categoria });
        if (!manga) {
            return res.status(404).json({ message: 'Manga no encontrado' });
        }
        res.json(manga.Categorias);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías por manga', error: error.message });
    }
};


