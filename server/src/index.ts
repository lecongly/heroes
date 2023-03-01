import App from './app';
import 'dotenv/config';
import HeroController from './hero/hero.controller';

const app = new App([new HeroController()], 5000)

app.listen()

