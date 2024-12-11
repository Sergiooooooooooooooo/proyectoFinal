import express from "express";
import { read, write } from '../utils/files.js';
import winston from 'winston';
import Joi from 'joi';
import dayjs from 'dayjs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ACCESS_LOG = `${__dirname}/access_log.txt`;

export const mangasFileRouter = express.Router();


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console(),
    ],
});

const accessLogMiddleware = (req, res, next) => {
    const now = dayjs().format('DD-MM-YYYY HH:mm:ss');
    const logLine = `${now} [${req.method}] [${req.originalUrl}] ${JSON.stringify(req.headers)}\n`;
    
    fs.appendFile(ACCESS_LOG, logLine, (err) => {
        if (err) {
            console.error('Error writing to access log:', err);
        }
    });
    
    next();
};

mangasFileRouter.use(accessLogMiddleware);

const addIpAndTimeStamp = (req, res, next) => {
    const now = dayjs().format('HH:mm DD-MM-YYYY');
    const { ip, created_at, updated_at, ...bodyWithoutTimestamps } = req.body;

    req.body = bodyWithoutTimestamps;
    req.body.ip = req.ip || req.connection.remoteAddress;


    if (req.method === 'POST') {
        req.body.created_at = now;
    } else if (req.method === 'PUT') {
        req.body.updated_at = now;
    }

    next();
};


mangasFileRouter.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    next();
});

const mangaSchema = Joi.object({
    titulo: Joi.string().min(1).required(),
    autor: Joi.string().min(1).required(),
    genero: Joi.array().items(Joi.string().valid('Aventura', 'Acción', 'Comedia', 'Drama', 'Fantasia', 'Sobrenatural', 'Oscuro', 'Horror', 'Terror')).min(1).required(),
    volumenes: Joi.number().integer().min(1).required(),
    fechaPublicacion: Joi.date().iso().required(),
    sinopsis: Joi.string().min(10).required(),
    calificacion: Joi.number().min(0).max(10).required(),
    editorial: Joi.string().min(1).required(),
    ip: Joi.string().optional(),
    created_at: Joi.string().optional(),
});

const updateMangaSchema = Joi.object({
    titulo: Joi.string().min(1).optional(),
    autor: Joi.string().min(1).optional(),
    genero: Joi.array().items(Joi.string().valid('Aventura', 'Acción', 'Comedia', 'Drama', 'Fantasía', 'Sobrenatural', 'Oscuro', 'Horror', 'Terror')).min(1).optional(),
    volumenes: Joi.number().integer().min(1).optional(),
    fechaPublicacion: Joi.date().iso().optional(),
    sinopsis: Joi.string().min(1).optional(),
    calificacion: Joi.number().min(0).max(10).optional(),
    editorial: Joi.string().min(1).optional(),
    ip: Joi.string().optional(),
    updated_at: Joi.string().optional(),
});


mangasFileRouter.get('/', (req, res) => {
    const mangas = read();
    const { filter, limit } = req.query;
    let filteredMangas = mangas;

    if (filter) {
        const [key, value] = filter.split(':'); 
        filteredMangas = filteredMangas.filter(manga => manga[key] === value);
    }

    if (limit) {
        const limitNumber = parseInt(limit, 10);
        if (!isNaN(limitNumber) && limitNumber > 0) {
            filteredMangas = filteredMangas.slice(0, limitNumber);
        }
    }

    res.json(filteredMangas);
});

mangasFileRouter.post('/', addIpAndTimeStamp, (req, res, next) => {
    console.log('Middleware POST');
    next();
}, (req, res) => {
    const { error } = mangaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const mangas = read();
    const manga = {
        ...req.body, 
        id: mangas.length + 1
    };
    mangas.push(manga);
    write(mangas);
    res.status(201).json(mangas);
});

mangasFileRouter.get('/:id', (req, res) => {
    const mangas = read();
    const manga = mangas.find(manga => manga.id === parseInt(req.params.id));
    if (manga) {
        res.json(manga);
    } else {
        res.status(404).end();
    }
});

mangasFileRouter.put('/:id', addIpAndTimeStamp, (req, res) => {
    const { error } = updateMangaSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const mangas = read();
    let manga = mangas.find(manga => manga.id === parseInt(req.params.id));
    if (manga) {
        manga = {
            ...manga,
            ...req.body
        };
        mangas[mangas.findIndex(manga => manga.id === parseInt(req.params.id))] = manga;
        write(mangas);
        res.json(manga);
    } else {
        res.status(404).end();
    }
});

mangasFileRouter.delete('/:id', (req, res) => {
    const mangas = read();
    const manga = mangas.find(manga => manga.id === parseInt(req.params.id));
    if (manga) {
        mangas.splice(
            mangas.findIndex(manga => manga.id === parseInt(req.params.id)),
            1
        );
        write(mangas);
        res.json(manga);
    } else {
        res.status(404).end();
    }
});

mangasFileRouter.put('/', addIpAndTimeStamp, (req, res) => {
    const { field, value } = req.body; 

    if (!field || !value) {
        return res.status(400).json({ message: "Debes proporcionar un campo y un valor para actualizar." });
    }

    const mangas = read(); 

   
    mangas.forEach(manga => {
        manga[field] = value; 
        manga.updated_at = dayjs().format('HH:mm DD-MM-YYYY'); 
    });

    write(mangas); 
    res.json({ message: "Registros actualizados exitosamente", updatedCount: mangas.length }); 
});


