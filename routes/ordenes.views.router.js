import express from "express";
import { formulario, create, destroy, update } from "../services/formulario.services.js";
import { ordenesValidationSchema } from "../schemas/validationsCreate/ordenesValidations.js";
import { ordenesValidationSchemaU } from "../schemas/validationsUpdate/ordenesValidations.js";
export const ordenesViewsRouter = express.Router();

ordenesViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/ordenesAuth/login");
    }
})

ordenesViewsRouter.get("/", async (req, res) => {
    const formularios = await formulario()
    res.render("admin/orders", {
        formularios,
        user: req.user
    });
})


ordenesViewsRouter.post("/", async (req, res) => {
    try {
        const { nombre, documento, apellido, direccion, telefono, confirmacionManga } = req.body;
        await ordenesValidationSchema.validateAsync({
            nombre, documento, apellido, direccion, telefono, confirmacionManga
        });
        await create({
            nombre, documento, apellido, direccion, telefono, confirmacionManga
        });
        res.redirect("/admin/orders");
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).send("Error interno del servidor");
    }
})

ordenesViewsRouter.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    let { nombre, documento, apellido, direccion, telefono, confirmacionManga } = req.body;
    const { error } = ordenesValidationSchemaU.validate({ nombre, documento, apellido, direccion, telefono, confirmacionManga });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    await update (id, { nombre, documento, apellido, direccion, telefono, confirmacionManga});
    res.redirect("/admin/orders");
})

ordenesViewsRouter.post("/destroy/:id", async (req, res) => {
    const { id } = req.params;
    await destroy (id);
    res.redirect("/admin/orders");
})
