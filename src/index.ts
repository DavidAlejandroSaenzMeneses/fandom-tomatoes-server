import express from 'express';
import cors from 'cors';
import MyRouter from './routes/index';
import {database} from './database/connection';

class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        database.connect();
        this.app.set('port', process.env.PORT || 3900);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }
    routes(): void {
        this.app.use('/api/v1', MyRouter);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`server up in: localhost:${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();