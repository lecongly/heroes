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
const hero_model_1 = __importDefault(require("./hero.model"));
class HeroService {
    constructor() {
        this.heroModel = hero_model_1.default;
    }
    getHeroes() {
        return __awaiter(this, void 0, void 0, function* () {
            const heroes = yield this.heroModel.find().exec();
            return heroes;
        });
    }
    createHero(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const newHero = yield this.heroModel.create({ name });
            return newHero;
        });
    }
    getHeroById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hero = yield this.heroModel.findById(id).exec();
            if (!hero) {
                throw new Error(`Hero with ID ${id} not found`);
            }
            return hero;
        });
    }
    updateHero(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const hero = yield this.heroModel.findByIdAndUpdate(id, update, { new: true });
            if (!hero) {
                throw new Error(`Hero with ID ${id} not found`);
            }
            return hero;
        });
    }
    deleteHero(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const hero = yield this.heroModel.findByIdAndDelete(id).exec();
            if (!hero) {
                throw new Error(`Hero with ID ${id} not found`);
            }
        });
    }
    searchHeroByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const heroes = yield hero_model_1.default.find({ name: { $regex: new RegExp(name, "i") } }).exec();
            return heroes;
        });
    }
}
exports.default = HeroService;
