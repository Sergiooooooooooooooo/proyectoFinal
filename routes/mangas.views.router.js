import express from "express";
import { index, create, destroy, update } from "../services/mangas.services.js";
import { mangasValidationSchema } from "../schemas/validationsCreate/mangasValidations.js"; 
import { mangasValidationSchemaU } from "../schemas/validationsUpdate/mangasValidations.js";
export const mangasViewsRouter = express.Router();

mangasViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/login");
    }
})


mangasViewsRouter.get("/", async (req, res) => {
    const mangas = await index()
    res.render('admin/productos', {
        mangas,
        user: req.user
    });
})

mangasViewsRouter.post("/", async (req, res) => {
    try {
        const { titulo, autor, genero, volumenes, fechaPublicacion, sinopsis, calificacion, editorial, precio, imagen } = req.body;
        await mangasValidationSchema.validateAsync({
            titulo, autor, genero, volumenes, fechaPublicacion, sinopsis, calificacion, editorial, precio, imagen
        });
        await create({
            titulo, autor, genero, volumenes, fechaPublicacion, sinopsis, calificacion, editorial, precio, imagen
        });
        res.redirect("/admin/productos");
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).send("Error interno del servidor");
    }
})

mangasViewsRouter.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    let { titulo, autor, genero, volumenes, fechaPublicacion, sinopsis, calificacion, editorial, precio, imagen } = req.body;
    const { error } = mangasValidationSchemaU.validate({ titulo, autor, genero, volumenes, fechaPublicacion, sinopsis, calificacion, editorial, precio, imagen });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    await update (id, {titulo, autor, genero, volumenes, fechaPublicacion, sinopsis, calificacion, editorial, precio, imagen});
    res.redirect("/admin/productos");
})

mangasViewsRouter.post("/destroy/:id", async (req, res) => {
    const { id } = req.params;
    await destroy (id);
    res.redirect("/admin/productos");
})