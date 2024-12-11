import express from "express";
import passport from "passport";
export const ordenesAuthRouter = express.Router();


ordenesAuthRouter.get("/login", async (req, res) => {
    res.render("ordenesAuth/login");
})


ordenesAuthRouter.post("/login", passport.authenticate('local', {
        successRedirect: "/admin/orders",
        failureRedirect: '/ordenesAuth/login',
    })
)

ordenesAuthRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/ordenesAuth/login");
        }
    );
})

