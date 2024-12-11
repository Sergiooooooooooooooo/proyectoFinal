import express from "express";
import { index, create, destroy, update } from "../services/categoria.crud.services.js";
import { categoriasValidationSchema } from "../schemas/validationsCreate/categoriasValidations.js";
import { categoriasValidationSchemaU } from "../schemas/validationsUpdate/categoriasValidations.js";
export const categoriasViewsRouter = express.Router();

categoriasViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/categoriasAuth/login");
    }
})

categoriasViewsRouter.get("/", async (req, res) => {
    const categorias = await index()
    res.render("admin/categorias", {
        categorias,
        user: req.user
    });
})

categoriasViewsRouter.post("/", async (req, res) => {
    try {
        const { nombre } = req.body;
        await categoriasValidationSchema.validateAsync({ nombre });
        await create({ nombre });
        res.redirect("/admin/categorias");
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).send("Error interno del servidor");
    }
})
categoriasViewsRouter.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    let {nombre} = req.body;
    const { error } = categoriasValidationSchemaU.validate({ nombre });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    await update (id, {nombre});
    res.redirect("/admin/categorias");
})

categoriasViewsRouter.post("/destroy/:id", async (req, res) => {
    const { id } = req.params;
    await destroy (id);
    res.redirect("/admin/categorias");
})