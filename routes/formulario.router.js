import express from "express";
import { formulario, create } from "../services/formulario.services.js";
export const formulariosViewsRouter = express.Router();

// Ruta para renderizar la vista del formulario
formulariosViewsRouter.get("/", async (req, res) => {
    const formularios = await formulario();
    const mangasEnCarrito = req.session.carrito || [];
    res.render('checkout', {
        formularios,
        mangas: mangasEnCarrito,
        user: formulario.user
    });
});

// Ruta para procesar los datos enviados desde el formulario
formulariosViewsRouter.post("/", async (req, res) => {
    // Extrae los datos del formulario y los mangas seleccionados
    let { nombre, documento, apellido, direccion, telefono, confirmacionManga, mangas } = req.body;
     // Verifica los mangas seleccionados
     console.log("Mangas seleccionados:", mangas);  // Asegúrate de que los mangas sean enviados como un array de IDs


    // Parsear los IDs de los mangas (enviados como string en JSON)
    const mangasSeleccionados = JSON.parse(mangas || "[]");

    // Guardar el formulario y los mangas seleccionados
    try {

        console.log("Mangas seleccionados:", mangasSeleccionados); 
        // Llamamos a la función 'create' del servicio para guardar el formulario y la relación con mangas
        await create({
            nombre,
            documento,
            apellido,
            direccion,
            telefono,
            confirmacionManga,
            mangas: mangasSeleccionados  // Pasa los IDs de los mangas
        });

        // Vaciar el carrito (array de mangas) en la sesión
        req.session.carrito = [];

        // Redirigir al usuario a la página de inicio o a una página de confirmación
        res.redirect("/");  // Puedes cambiar esto por una URL de confirmación si prefieres
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
        // Manejo de errores
        res.status(500).send("Error al guardar los datos del formulario.");
    }
});
