import HeroModel, {Hero} from './hero.model';

export default class HeroService {
    private heroModel = HeroModel;

    public async getHeroes(): Promise<Hero[]> {
        const heroes = await this.heroModel.find().exec();
        return heroes;
    }

    public async createHero(name: string): Promise<Hero> {
        const newHero = await this.heroModel.create({name});
        return newHero;
    }

    public async getHeroById(id: string): Promise<Hero> {
        const hero = await this.heroModel.findById(id).exec();
        if (!hero) {
            throw new Error(`Hero with ID ${id} not found`);
        }
        return hero;
    }

    public async updateHero(id: string, update: Partial<Hero>): Promise<Hero> {
        const hero = await this.heroModel.findByIdAndUpdate(id, update, {new: true});
        if (!hero) {
            throw new Error(`Hero with ID ${id} not found`);
        }
        return hero;
    }

    public async deleteHero(id: string): Promise<void> {
        const hero = await this.heroModel.findByIdAndDelete(id).exec();
        if (!hero) {
            throw new Error(`Hero with ID ${id} not found`);
        }
    }

    public async searchHeroByName(name: string): Promise<Hero[]> {
        const heroes = await HeroModel.find({name: {$regex: new RegExp(name, "i")}}).exec();
        return heroes;
    }

}