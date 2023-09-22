export type User = {
    id: string;
    name: string;
    surname: string;
    login: string;
    password: string;
    courses: string[];
};

export type LoginUser = Pick<User, 'login' | 'password'>;
