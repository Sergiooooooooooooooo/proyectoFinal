import express from "express";
import { index, create, destroy, update } from "../services/usuarios.services.js";
import { usersValidationSchema } from "../schemas/validationsCreate/usersValidations.js";
import { usersValidationSchemaU } from "../schemas/validationsUpdate/usersValidations.js";
export const usersViewsRouter = express.Router();

usersViewsRouter.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/usersAuth/login");
    }
})

usersViewsRouter.get("/", async (req, res) => {
    const users = await index()
    res.render("admin/users", {
        users,
        user: req.user
    });
})

usersViewsRouter.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;
        await usersValidationSchema.validateAsync({ username, password });
        await create({ username, password });
        res.redirect("/admin/users");
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({ message: error.details[0].message });
        }
        res.status(500).send("Error interno del servidor");
    }
})

usersViewsRouter.post("/edit/:id", async (req, res) => {
    const { id } = req.params;
    let {username, password} = req.body;
    const { error } = usersValidationSchemaU.validate({ username, password });
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    await update (id, {username, password});
    res.redirect("/admin/users");
})

usersViewsRouter.post("/destroy/:id", async (req, res) => {
    const { id } = req.params;
    await destroy (id);
    res.redirect("/admin/users");
})