import express from "express";
export const carritoViewsRouter = express.Router();
import { sequelize } from '../libs/sequelize.js';

carritoViewsRouter.get("/", async (req, res) => {
    // Si no hay carrito en la sesión, lo inicializamos como un array vacío
    if (!req.session.carrito) {
        req.session.carrito = [];
    }
    
    // Obtener los mangas que están en el carrito (en la sesión)
    const mangasEnCarrito = req.session.carrito;

    // Renderizar la vista con los mangas en el carrito
    res.render('carrito', {
        mangas: mangasEnCarrito,  // Enviamos solo los mangas que están en el carrito
        user: req.user
    });
});

carritoViewsRouter.post("/", async (req, res) => {
    const { id } = req.body; // El id del manga a agregar
    const manga = await sequelize.models.manga.findByPk(id);

    // Si el manga existe y no está en el carrito, lo agregamos
    if (manga) {
        if (!req.session.carrito) {
            req.session.carrito = [];
        }

        // Verificar si ya está en el carrito
        const existsInCarrito = req.session.carrito.some(item => item.id === manga.id);
        if (!existsInCarrito) {
            req.session.carrito.push(manga);
        }
    }

    // Redirigir al carrito
    return res.redirect("/carrito");
});

carritoViewsRouter.post("/add/:id", async (req, res) => {
    const { id } = req.params;
    const manga = await sequelize.models.manga.findByPk(id);

    // Si el manga existe y el carrito está vacío, inicializa el carrito
    if (manga) {
        // Si no existe el carrito en la sesión, lo inicializamos como un array vacío
        if (!req.session.carrito) {
            req.session.carrito = [];
        }

        // Agregar solo el manga seleccionado al carrito
        req.session.carrito.push(manga);

        // Redirigir al carrito después de agregar el manga
        return res.redirect("/carrito");
    } else {
        // Si no se encuentra el manga, redirige al carrito
        return res.redirect("/carrito");
    }
});


carritoViewsRouter.post("/destroy/:id", async (req, res) => {
    const { id } = req.params;
    
    // Verificamos si el carrito existe en la sesión
    if (req.session.carrito) {
        // Filtramos el carrito para eliminar el manga con el id especificado
        req.session.carrito = req.session.carrito.filter(manga => manga.id !== parseInt(id));
    }

    // Redirigimos al carrito después de eliminar el manga
    return res.redirect("/carrito");
});





