import User, { UserEvent, UserRole } from '../entities/user';
import { v4 as uuidv4 } from 'uuid';
import { UserNotFound } from '../exceptions/user-not-found';


export class UserService {

    static Find = function (userId): Promise<User> {
        return this.FindUser(userId, false);
    }

    static async List(): Promise<User[]> {
        return await User.find();
    }

    static async Create(user): Promise<User> {
        const createdUser: User = User.create({
            uuid: uuidv4(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            role: UserRole.CLIENT,
            creationDate: new Date(),
            currentEvent: UserEvent.CREATION,
        });

        await createdUser.save();

        return createdUser;
    }

    static async Edit(userId, editUser): Promise<User> {
        const user: User = await this.FindUser(userId, true);

        const editedUser = { ...user, ...editUser };

        await User.update(user.uuid, editedUser);

        return editedUser;
    }

    static async Remove(userId) {
        const user: User = await await this.Find(userId);

        if (user) {
            console.log('User deleted:', user);
            User.delete(user);
        } else {
            console.log('User not found or already deleted:', userId);
        }
    }

    private static async FindUser(userId: any, shouldThrowException = false): Promise<User> {
        const user = await User.findOne({ uuid: userId });

        if (!user && shouldThrowException) {
            throw new UserNotFound();
        }

        return user;
    }
}