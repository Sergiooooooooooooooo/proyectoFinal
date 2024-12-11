import express from "express";
import passport from "passport";
export const categoriasAuthRouter = express.Router();


categoriasAuthRouter.get("/login", async (req, res) => {
    res.render("categoriasAuth/login");
})


categoriasAuthRouter.post("/login", passport.authenticate('local', {
        successRedirect: "/admin/categorias",
        failureRedirect: '/categoriasAuth/login',
    })
)

categoriasAuthRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/categoriasAuth/login");
        }
    );
})

