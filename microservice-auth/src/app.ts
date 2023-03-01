import express, {Application, NextFunction, Request, Response} from 'express';
import Controller from 'utils/interfaces/controller.interface';
import mongoDB from './utils/database/mongoDB';
import ErrorMiddleware, {notFoundRoute} from './middleware/error.middleware';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// import HttpException from './utils/exception/http.exception';

class App {
    private express: Application
    private port: number

    private initialiseMiddleware(): void {
        this.express.use(
            cors({
                // origin: "http://localhost:4200", // allow to server to accept request from different origin
                // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
                // credentials: true, // allow session cookie from browser to pass through
            })
        );
        this.express.use(express.json())
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(morgan("dev"))
        this.express.use(bodyParser())
    }

    private initialiseDatabase(): void {
        const db = new mongoDB();
        (async () => {
            await db.connect(process.env.MONGODB_URI!)
        })()
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(notFoundRoute);
        this.express.use(ErrorMiddleware);
    }

    constructor(controllers: Controller[], port: number) {
        this.express = express()
        this.port = port
        this.initialiseDatabase()
        this.initialiseMiddleware()
        this.initialiseControllers(controllers)
        this.initialiseErrorHandling()

    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listen on port ${this.port}`)
        })
    }
}

export default App