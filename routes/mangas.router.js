import express from "express";
export const mangasRouter = express.Router();
import { mangasValidationSchema } from "../schemas/validationsCreate/mangasValidations.js"; 
import { mangasValidationSchemaU } from "../schemas/validationsUpdate/mangasValidations.js";
import {index, create, show, update, destroy} from "../services/mangas.services.js";

mangasRouter.get("/", async (req, res) => {
    const mangas = await index();   
    res.json({mangas});
})

mangasRouter.post('/', async (req, res) => {
    const { error, value } = mangasValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    const newManga = await create(manga)
    res.status(201).json({manga: newManga});
})

mangasRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const manga = await show(id);
    if (!manga) {
        return res.status(404)
        .json({error: 'Manga not found'});
    }
    res.json({manga});
})

mangasRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { error, value } = mangasValidationSchemaU.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    const updatedManga = await update(id, manga);
    if (!updatedManga) {
        return res.status(404)
        .json({error: 'Manga not found'});
    }
    res.json({manga: updatedManga});
    })

mangasRouter.delete('/:id', async (req, res) => {
        const id = req.params.id; 
        const deletedManga = await destroy(id); 
    
        if (!deletedManga) {
            return res.status(404).json({ error: 'Manga not found' });
        }

        res.status(200).json({ message: 'Manga deleted successfully', manga: deletedManga });
    });
    
