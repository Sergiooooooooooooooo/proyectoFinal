//API POSTMAN
import express from "express";
export const categoriasRouter = express.Router();
import { categoriasValidationSchema } from "../schemas/validationsCreate/categoriasValidations.js";
import { categoriasValidationSchemaU } from "../schemas/validationsUpdate/categoriasValidations.js";
import {index, create, show, update, destroy} from "../services/categoria.crud.services.js";

categoriasRouter.get("/", async (req, res) => {
    const categorias = await index();   
    res.json({categorias});
})

categoriasRouter.post('/', async (req, res) => {
    const { error, value } = categoriasValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    const newCategoria = await create(categoria)
    res.status(201).json({categoria: newCategoria});
})

categoriasRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const categoria = await show(id);
    if (!categoria) {
        return res.status(404)
        .json({error: 'Categoria not found'});
    }
    res.json({categoria});
})

categoriasRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { error, value } = categoriasValidationSchemaU.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    const updatedCategoria = await update(id, categoria);
    if (!updatedCategoria) {
        return res.status(404)
        .json({error: 'Categoria not found'});
    }
    res.json({categoria: updatedCategoria});
    })

categoriasRouter.delete('/:id', async (req, res) => {
        const id = req.params.id; 
        const deletedCategoria = await destroy(id); 
    
        if (!deletedCategoria) {
            return res.status(404).json({ error: 'Categoria not found' });
        }

        res.status(200).json({ message: 'Categoria deleted successfully', categoria: deletedCategoria });
    });
    
