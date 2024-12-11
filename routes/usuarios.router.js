import express from "express";
export const usuariosRouter = express.Router();
import { usersValidationSchema } from "../schemas/validationsCreate/usersValidations.js";
import { usersValidationSchemaU } from "../schemas/validationsUpdate/usersValidations.js";
import {index, create, show, update, destroy} from "../services/usuarios.services.js";

usuariosRouter.get("/", async (req, res) => {
    const users = await index();   
    res.json({users});
})

usuariosRouter.post('/', async (req, res) => {
    const { error, value } = usersValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    const newUser = await create(user)
    res.status(201).json({user: newUser});
})

usuariosRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await show(id);
    if (!user) {
        return res.status(404)
        .json({error: 'User not found'});
    }
    res.json({user});
})

usuariosRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { error, value } = usersValidationSchemaU.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    const updatedUser = await update(id, user);
    if (!updatedUser) {
        return res.status(404)
        .json({error: 'User not found'});
    }
    res.json({user: updatedUser});
    })

usuariosRouter.delete('/:id', async (req, res) => {
        const id = req.params.id; 
        const deletedUser = await destroy(id); 
    
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    });
    
