import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/upload';
import { platform } from '../controllers/platform.controller';
import { movie } from '../controllers/movie.controller';
import { review } from '../controllers/review.controller';
import { imageManager } from '../controllers/imageManager.controller';


const upload = uploadMiddleware;

class MyRouterClass {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {

        //platform endpoints
        this.router.post('/platforms', upload.single('file'), platform.create);
        this.router.get('/platforms/:id', platform.readOne);
        this.router.get('/platforms', platform.readAll);
        this.router.get('/platforms/get-icon/:image', imageManager.get);

        //movie endpoints
        this.router.post('/movies', upload.single('file'), movie.create);
        this.router.get('/movies/:id', movie.readOne);
        this.router.get('/movies', movie.readAll);
        this.router.put('/movies/:id', upload.single('file'), movie.update);
        this.router.delete('/movies/:id', movie.delete);
        this.router.post('/movies/clone/:id', movie.clone);
        this.router.get('/movies/get-image/:image', imageManager.get);

        //reviews endpoints
        this.router.post('/reviews/', review.create);
    }
}

const MyRouter = new MyRouterClass();

export default MyRouter.router;
