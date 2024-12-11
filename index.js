import express from 'express';
import 'dotenv/config';
import { routerMangas } from './routes/index.js';
import { configurePassport } from './config/passport.js';
import session from 'express-session';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
configurePassport(app);

app.use((req, res, next) => {
    console.log('Middleware');
    next();
})
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});



routerMangas(app)

app.listen(3000, () => {
    console.log('Server is running on port 3000');   
})