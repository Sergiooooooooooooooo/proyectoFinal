import express from "express";
import { mangasFileRouter } from "./mangas.file.router.js";
import { mangasRouter } from "./mangas.router.js";
import { usuariosRouter } from "./usuarios.router.js";
import { ordenesRouter } from "./ordenes.router.js";
import { categoriasRouter } from "./categorias.router.js";
import { mangasViewsRouter } from "./mangas.views.router.js";
import { authRouter } from "./auth.router.js";
import { mangasProductsViewsRouter } from "./mangas.products.views.router.js";
import { carritoViewsRouter } from "./carrito.views.router.js";
import { formulariosViewsRouter } from "./formulario.router.js";
import { categoriasViewsRouter } from "./categoria.views.router.js";
import { categoriasAuthRouter } from "./categorias.auth.router.js";
import { ordenesViewsRouter } from "./ordenes.views.router.js";
import { ordenesAuthRouter } from "./ordenes.auth.router.js";
import { usersViewsRouter } from "./users.views.router.js";
import { usersAuthRouter } from "./users.auth.router.js";


const router = express.Router();


export function routerMangas(app){
    app.use("/auth", authRouter);
    app.use("/categoriasAuth", categoriasAuthRouter);
    app.use("/ordenesAuth", ordenesAuthRouter);
    app.use("/usersAuth", usersAuthRouter);
    app.use("/", mangasProductsViewsRouter);
    app.use("/api/v1", router);
    app.use("/admin/productos", mangasViewsRouter);
    app.use("/carrito", carritoViewsRouter);
    app.use("/formulario", formulariosViewsRouter);
    app.use("/admin/categorias", categoriasViewsRouter);
    app.use("/admin/orders", ordenesViewsRouter);
    app.use("/admin/users", usersViewsRouter);


    router.use("/file/mangas",mangasFileRouter);
    router.use("/admin/productos", mangasRouter);
    router.use("/admin/usuarios", usuariosRouter);
    router.use("/admin/categorias", categoriasRouter);
    router.use("/admin/orders", ordenesRouter);

}