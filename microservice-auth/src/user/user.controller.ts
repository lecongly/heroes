import Controller from '../utils/interfaces/controller.interface';
import {NextFunction, Request, Response, Router} from 'express';
import UserService from './user.service';
import HttpException from '../utils/exception/http.exception';
import {signToken} from '../utils/token';
import {authMiddleware} from '../middleware/authenticated.middleware';


export default class UserController implements Controller {
    path: string;
    router: Router;
    private userService = new UserService();

    constructor() {
        this.path = '/users'
        this.router = Router()
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            this.login
        );
        this.router.get(`${this.path}/me`, authMiddleware, this.getMe);
        this.router.get(`${this.path}/:userId`, this.getUserByUserId);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const body = req.body;
            const userCreated = await this.userService.register(body);
            const {_id, email} = userCreated
            const token = signToken({_id, email})
            res.status(200).json({user: userCreated, token})
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const body = req.body;
            const user = await this.userService.login(body);
            const {_id, email} = user
            const token = signToken({_id, email})
            res.status(200).json({user, token})
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getMe = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const user = await this.userService.getUserById(
                res.locals.token._id
            );
            res.status(200).json(user)
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }

    };
    private getUserByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const userId = req.params.userId;
            const user = await this.userService.getUserById(userId);
            res.status(200).json(user)
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }
}