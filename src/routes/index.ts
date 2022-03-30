import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/upload';
//import {login} from '../controllers/login.controller';
import { platform } from '../controllers/platform.controller';
import { movie } from '../controllers/movie.controller';
import { review } from '../controllers/review.controller';


const upload = uploadMiddleware;

class MyRouterClass {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        //this.router.post('/login',login.validate);

        //platform endpoints
        this.router.post('/platforms', upload.single('file'), platform.create);
        this.router.get('/platforms/:id', platform.readOne);
        this.router.get('/platforms', platform.readAll);

        //movie endpoints
        this.router.post('/movies', upload.single('file'), movie.create);
        this.router.get('/movies/:id', movie.readOne);
        this.router.get('/movies', movie.readAll);
        this.router.put('/movies/:id', upload.single('file'), movie.update);
        this.router.delete('/movies/:id', movie.delete);

        //reviews endpoints
        this.router.post('/reviews/', review.create);
    }
}

const MyRouter = new MyRouterClass();

export default MyRouter.router;
