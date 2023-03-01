import App from './app';
import 'dotenv/config';
import UserController from './user/user.controller';

const app = new App([new UserController()], 3000)

app.listen()

