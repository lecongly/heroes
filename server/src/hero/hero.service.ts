import HeroModel, {Hero} from './hero.model';

export default class HeroService {
    private heroModel = HeroModel;

    public async getHeroes(): Promise<Hero[]> {
        const heroes = await this.heroModel.find().exec();
        return heroes;
    }

    public async getHeroesByUserId(userId: string): Promise<Hero[]> {
        const heroes = await this.heroModel.find({user: userId}).exec();
        return heroes
    }

    public async createHero(name: string, userId: string): Promise<Hero> {
        const newHero = await this.heroModel.create({name, user: userId});
        return newHero;
    }

    public async getHeroById(id: string): Promise<Hero> {
        const hero = await this.heroModel.findById(id).exec();
        if (!hero) {
            throw new Error(`Hero with ID ${id} not found`);
        }
        return hero;
    }

    public async updateHero(id: string, update: Partial<Hero>, userId: string): Promise<Hero> {
        const hero = await this.heroModel.findOneAndUpdate({_id: id, user: userId}, update);
        if (!hero) {
            throw new Error(`You are not allowed to update hero with ID ${id}`);
        }
        return hero;
    }

    public async deleteHero(id: string, userId: string): Promise<Hero> {
        const hero = await this.heroModel.findOneAndDelete({_id: id, user: userId}).exec();
        if (!hero) {
            throw new Error(`You are not allowed to delete hero with ID  ${id} `);
        }
        return hero
    }

    public async searchHeroByName(name: string): Promise<Hero[]> {
        const heroes = await HeroModel.find({name: {$regex: new RegExp(name, "i")}}).exec();
        return heroes;
    }

}