import Controller from '../utils/interfaces/controller.interface';
import {Router, Request, Response, NextFunction} from 'express';
import HeroService from './hero.service';
import HttpException from '../utils/exception/http.exception';

export default class HeroController implements Controller {
    path: string;
    router: Router;
    private heroService = new HeroService()

    constructor() {
        this.path = '/heroes'
        this.router = Router()
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.getAllHero
        )
        this.router.post(
            `${this.path}`,
            this.createHero
        )
        this.router.get(
            `${this.path}/search`,
            this.searchHero
        )
        this.router.get(
            `${this.path}/:id`,
            this.getHero
        )
        this.router.put(
            `${this.path}/:id`,
            this.updateHero
        )
        this.router.delete(
            `${this.path}/:id`,
            this.deleteHero
        )

    }

    private getAllHero = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const heroes = await this.heroService.getHeroes()
            res.status(200).json(heroes)
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }

    private createHero = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const hero = await this.heroService.createHero(req.body.name)
            res.status(201).json(hero)
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }
    private getHero = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.params.id
            const hero = await this.heroService.getHeroById(id)
            res.status(200).json(hero)
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }
    private updateHero = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.params.id;
            const updatedHero = await this.heroService.updateHero(id, req.body);
            res.status(200).json(updatedHero);
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }
    private deleteHero = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.params.id;
            const hero = await this.heroService.deleteHero(id);
            res.status(200).json(hero);
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    }

    private searchHero = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const name = req.query.name as string;
            const heroes = await this.heroService.searchHeroByName(name);
            res.status(200).json(heroes);
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };
}