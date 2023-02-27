"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hero_service_1 = __importDefault(require("./hero.service"));
const http_exception_1 = __importDefault(require("../utils/exception/http.exception"));
class HeroController {
    constructor() {
        this.heroService = new hero_service_1.default();
        this.getAllHero = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const heroes = yield this.heroService.getHeroes();
                res.status(200).json(heroes);
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.createHero = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const hero = yield this.heroService.createHero(req.body.name);
                res.status(201).json(hero);
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.getHero = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const hero = yield this.heroService.getHeroById(id);
                res.status(200).json(hero);
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.updateHero = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const updatedHero = yield this.heroService.updateHero(id, req.body);
                res.status(200).json(updatedHero);
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.deleteHero = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.heroService.deleteHero(id);
                res.sendStatus(204);
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.searchHero = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.query.name;
                const heroes = yield this.heroService.searchHeroByName(name);
                res.status(200).json(heroes);
            }
            catch (e) {
                next(new http_exception_1.default(400, e.message));
            }
        });
        this.path = '/heroes';
        this.router = (0, express_1.Router)();
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, this.getAllHero);
        this.router.post(`${this.path}`, this.createHero);
        this.router.get(`${this.path}/search`, this.searchHero);
        this.router.get(`${this.path}/:id`, this.getHero);
        this.router.put(`${this.path}/:id`, this.updateHero);
        this.router.delete(`${this.path}/:id`, this.deleteHero);
    }
}
exports.default = HeroController;
