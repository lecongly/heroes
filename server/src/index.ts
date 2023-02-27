import App from './app';
import 'dotenv/config';
import HeroController from './hero/hero.controller';
import UserController from './user/user.controller';

const app = new App([new HeroController(), new UserController()], 5000)

app.listen()

