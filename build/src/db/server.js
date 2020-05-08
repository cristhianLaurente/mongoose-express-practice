"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const users_1 = require("../routes/users");
class Server {
    constructor() {
        this.port = process.env.PORT || 3001;
        this.url = process.env.NODE_ENV || 'dev';
        dotenv_1.config();
        this.app = express_1.default();
        this.settings__json();
        this.settings__cors();
        this.connect__mongoDB();
        this.settings__routes();
    }
    settings__cors() {
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
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // console.log('json')
    }
    settings__routes() {
        this.app.get('/', (req, res) => {
            res.json({
                ok: true,
                message: 'The server is active'
            });
        });
        // console.log('routes')
        this.app.use('', users_1.user_router);
    }
    connect__mongoDB() {
        // let uri = 'mongodb+srv://root:root@cluster0-p1oys.mongodb.net/test?retryWrites=true&w=majority'
        process.env.NODE_ENV = this.url;
        let urlDB;
        let useUnifiedTopology;
        if (process.env.NODE_ENV === 'dev') {
            urlDB = process.env.URL_DEV;
            useUnifiedTopology = true;
        }
        else {
            urlDB = process.env.URL_PROD;
            useUnifiedTopology = false;
        }
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.connect(urlDB, {
            useCreateIndex: true,
            useNewUrlParser: true,
            dbName: 'cafe',
            useUnifiedTopology
        }).then(() => {
            console.log('MongoDB Conectado');
        }).catch((err) => {
            console.log(err);
        });
    }
    run__start() {
        this.app.listen(this.port, () => {
            console.log(`the server running successfully in port http://localhost:${this.port} `);
        });
    }
}
exports.Server = Server;
