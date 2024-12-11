import express from 'express';
import { defineModels } from '../db/models/index.js'; // Importamos los modelos desde index.js
import { sequelize } from '../libs/sequelize.js';

export const CategoriaViewsrouter = express.Router();

// Inicializa los modelos pasando la instancia de Sequelize
const { Categoria, Manga } = defineModels(sequelize); // Obtenemos los modelos

// Ruta para obtener mangas por categoría
CategoriaViewsrouter.get('/categorias/:id/mangas', async (req, res) => {
    const { id } = req.params;

    try {
        // Busca la categoría junto con los mangas relacionados
        const categoria = await Categoria.findByPk(id, { include: Manga });
        if (!categoria) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        res.json(categoria.Mangas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default CategoriaViewsrouter;


