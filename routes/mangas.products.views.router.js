import express from "express";
import { tienda } from "../services/mangas.products.services.js";
export const mangasProductsViewsRouter = express.Router();

mangasProductsViewsRouter.get("/", async (req, res) => {
    const categoriaId = req.query.categoriaId || 0;
    const { mangas, categorias } = await tienda(categoriaId)
    res.render('tienda', {
        mangas,
        categorias,
        categoriaId
    });
})
