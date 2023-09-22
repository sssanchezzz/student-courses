import bcrypt from 'bcryptjs';
import { LoginUser, User } from 'types/user';
import users from 'db/users.json';

class UsersService {
    private static _instance: UsersService;

    static getInstance() {
        if (!this._instance) {
            this._instance = new UsersService();
        }
        return this._instance;
    }

    login(user: LoginUser): Promise<User | null> {
        return new Promise<User | null>((res, rej) => {
            const dbUser = users.find((u) => u.login === user.login) as User;
            if (dbUser) {
                const isPasswordValid = bcrypt.compareSync(
                    user.password,
                    dbUser.password
                );

                if (isPasswordValid) {
                    res(dbUser);
                }
            }
            res(null);
        });
    }

    getById(id: string): Promise<User | null> {
        return new Promise<User | null>((res, rej) => {
            const user = users.find((user) => user.id === id);
            res(user || null);
        });
    }

    getAll(): Promise<User> {
        throw new Error('Method not implemented.');
    }
    create(data: User): void {
        throw new Error('Method not implemented.');
    }

    update(id: string, updateValue: User) {}
    delete(id: string) {
        return new Promise<User>((res, rej) =>
            res({
                id: 'ujfirw78',
                name: 'John',
                login: 'john@mail.com',
                password: '',
            } as User)
        );
    }
}

const usersService = UsersService.getInstance();

export default usersService;
