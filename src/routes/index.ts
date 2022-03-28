import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/upload';
//import {login} from '../controllers/login.controller';
import { platform } from '../controllers/platform.controller';
import { movie } from '../controllers/movie.controller';


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
    }
}

const MyRouter = new MyRouterClass();

export default MyRouter.router;
