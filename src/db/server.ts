import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import { user_router } from '../routes/users';

export class Server {
    public app: express.Application;
    public static _instace: Server;
    public port = process.env.PORT || 3001;
    public url = process.env.NODE_ENV || 'dev'
    
    constructor() {
        config()
        this.app = express();
        this.settings__json();
        this.settings__cors();
        this.connect__mongoDB();
        this.settings__routes();
    }




    settings__cors () {
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        // console.log('cors')
    }

    settings__json() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }) )
        // console.log('json')
    }

    settings__routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                ok: true,
                message: 'The server is active'
            });
        });
        // console.log('routes')

        this.app.use('', user_router );
    }

    connect__mongoDB() {
        // let uri = 'mongodb+srv://root:root@cluster0-p1oys.mongodb.net/test?retryWrites=true&w=majority'
        process.env.NODE_ENV = this.url;
        let urlDB : any ;
        let useUnifiedTopology;
        if(process.env.NODE_ENV === 'dev') {
            urlDB = process.env.URL_DEV
            useUnifiedTopology = true
        } else  {
            urlDB = process.env.URL_PROD
            useUnifiedTopology = false
        }  
        mongoose.set('useFindAndModify', false);
        mongoose.connect( urlDB  , {
            useCreateIndex : true,
            useNewUrlParser: true,
            dbName: 'cafe',
            useUnifiedTopology
        }).then(() => {
            console.log('MongoDB Conectado')
        }).catch((err:any) => {
            console.log(err)
        })
    }

    

    run__start() {
        this.app.listen(this.port, () => {
            console.log(`the server running successfully in port http://localhost:${this.port} `);
        })
    }
}