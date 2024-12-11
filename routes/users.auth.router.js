import express from "express";
import passport from "passport";
export const usersAuthRouter = express.Router();


usersAuthRouter.get("/login", async (req, res) => {
    res.render("usersAuth/login");
})


usersAuthRouter.post("/login", passport.authenticate('local', {
        successRedirect: "/admin/users",
        failureRedirect: '/usersAuth/login',
    })
)

usersAuthRouter.get("/logout", async (req, res) => {
    req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/usersAuth/login");
        }
    );
})

