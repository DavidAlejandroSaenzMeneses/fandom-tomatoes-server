import {Router} from 'express';
import {login} from '../controllers/login.controller';
import {platform} from '../controllers/platform.controller';

class MyRouterClass{
    router: Router;
    constructor(){
        this.router = Router();
        this.routes(); 
    }
    routes(){
        this.router.post('/login',login.validate);
        
        this.router.post('/platforms',platform.create);
        this.router.get('/platforms/:id?',platform.read);
    }
}

const MyRouter = new MyRouterClass();

export default MyRouter.router;
