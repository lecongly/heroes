import UserModel, {User} from './user.model';
import bcrypt from 'bcrypt';

export default class UserService {
    private userModel = UserModel

    public async register(user: Pick<User, "name" | "email" | "password">): Promise<User> {
        const userExist = await this.userModel.findOne({email: user.email});
        if (userExist) {
            throw new Error('The email already exists .')
        }
        const passwordHash = await bcrypt.hash(user.password, 10);
        const userCreate = await this.userModel.create({...user, password: passwordHash})
        return userCreate
    }

    public async login(user: Pick<User, "email" | "password">): Promise<User> {
        const userExist = await this.userModel.findOne({email: user.email});
        if (!userExist) {
            throw new Error('The email/password you entered is incorrect.');
        }
        const isMatch = await bcrypt.compare(user.password, userExist.password);
        if (!isMatch) {
            throw new Error('The email/password you entered is incorrect.');
        }
        return userExist
    }

    public async getUserById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

}
