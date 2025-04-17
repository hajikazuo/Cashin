export type User = {
    id: string;
    email: string;
    name: string,
    roles: string[];
};

export type ApiSignUp = {
    user: User,
    authToken: string
}

export type ApiSignIn = {
    user: User,
    authToken: string
}

export type ApiGetUser = User;
